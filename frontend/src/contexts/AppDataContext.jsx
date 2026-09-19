import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSakhiAIResponse } from '../utils/sakhiAI.js';

const initialMembers = [
  { id: 1, name: 'शांति देवी', phone: '9999999999', village: 'बाग़ी', savings: 18500, loan: 'मंजूर', attendance: '96%', status: 'सक्रिय' },
  { id: 2, name: 'मीरा बाई', phone: '8888888888', village: 'खैरपुर', savings: 14200, loan: 'लंबित', attendance: '92%', status: 'जाँच चल रही' },
  { id: 3, name: 'कविता यादव', phone: '7777777777', village: 'मधुकर', savings: 22900, loan: 'खुली', attendance: '98%', status: 'बेहतर' }
];

const initialSavings = [
  { id: 1, member: 'शांति देवी', amount: 3500, date: '15 Jul 2026', type: 'जमा' },
  { id: 2, member: 'मीरा बाई', amount: 2100, date: '12 Jul 2026', type: 'जमा' }
];

const initialLoans = [
  { id: 1, member: 'आशा सिंह', amount: 25000, tenure: '12 महीने', status: 'मंजूर' },
  { id: 2, member: 'रानी पाटिल', amount: 18000, tenure: '8 महीने', status: 'लंबित' },
  { id: 3, member: 'संगीता राव', amount: 30000, tenure: '15 महीने', status: 'अतिदेय' }
];

const initialMeetings = [
  { id: 1, title: 'मासिक समीक्षा', time: 'कल • सुबह 10:30', note: 'ऋण और बचत की समीक्षा' },
  { id: 2, title: 'ऋण समिति', time: 'शुक्रवार • शाम 4:00', note: 'नए ऋण पर विचार' }
];

function readStoredData() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem('sakhisetu-data');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getInitialData() {
  const stored = readStoredData();
  if (stored) {
    return {
      members: stored.members || initialMembers,
      savings: stored.savings || initialSavings,
      loans: stored.loans || initialLoans,
      meetings: stored.meetings || initialMeetings
    };
  }

  return {
    members: initialMembers,
    savings: initialSavings,
    loans: initialLoans,
    meetings: initialMeetings
  };
}

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [data, setData] = useState(getInitialData);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sakhisetu-data', JSON.stringify(data));
    }
  }, [data]);

  const addMember = (memberInput) => {
    const newMember = {
      id: Date.now(),
      name: memberInput.name,
      phone: memberInput.phone,
      village: memberInput.village,
      savings: Number(memberInput.savings) || 0,
      loan: 'नया',
      attendance: '100%',
      status: 'सक्रिय'
    };

    setData((prev) => ({ ...prev, members: [newMember, ...prev.members] }));
  };

  const recordSavings = (recordInput) => {
    const amount = Number(recordInput.amount) || 0;
    const memberName = recordInput.member;

    setData((prev) => ({
      ...prev,
      savings: [{
        id: Date.now(),
        member: memberName,
        amount,
        date: new Date().toLocaleDateString('en-IN'),
        type: 'जमा'
      }, ...prev.savings],
      members: prev.members.map((member) => member.name === memberName ? { ...member, savings: member.savings + amount } : member)
    }));
  };

  const approveLoan = (loanId) => {
    setData((prev) => ({
      ...prev,
      loans: prev.loans.map((loan) => loan.id === loanId ? { ...loan, status: 'मंजूर' } : loan)
    }));
  };

  const addMeeting = (meetingInput) => {
    const meeting = {
      id: Date.now(),
      title: meetingInput.title,
      time: meetingInput.time,
      note: meetingInput.note
    };

    setData((prev) => ({ ...prev, meetings: [meeting, ...prev.meetings] }));
  };

  const askSakhiAI = (query) => getSakhiAIResponse(query, {
    members: data.members.length,
    activeLoans: data.loans.filter((loan) => loan.status === 'मंजूर').length,
    overdueLoans: data.loans.filter((loan) => loan.status === 'अतिदेय').length,
    totalSavings: data.savings.reduce((sum, item) => sum + item.amount, 0)
  });

  const value = useMemo(() => ({
    ...data,
    addMember,
    recordSavings,
    approveLoan,
    addMeeting,
    askSakhiAI
  }), [data]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  return useContext(AppDataContext);
}
