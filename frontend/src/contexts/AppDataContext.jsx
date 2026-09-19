import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSakhiAIResponse } from '../utils/sakhiAI.js';

const initialMembers = [
  { id: 1, name: 'Shanti Devi', phone: '9999999999', village: 'Bagh', savings: 18500, loan: 'Approved', attendance: '96%', status: 'Active' },
  { id: 2, name: 'Meera Bai', phone: '8888888888', village: 'Khairpur', savings: 14200, loan: 'Pending', attendance: '92%', status: 'Under review' },
  { id: 3, name: 'Kavita Yadav', phone: '7777777777', village: 'Madhukar', savings: 22900, loan: 'Open', attendance: '98%', status: 'Strong' }
];

const initialSavings = [
  { id: 1, member: 'Shanti Devi', amount: 3500, date: '15 Jul 2026', type: 'Deposit' },
  { id: 2, member: 'Meera Bai', amount: 2100, date: '12 Jul 2026', type: 'Deposit' }
];

const initialLoans = [
  { id: 1, member: 'Asha Singh', amount: 25000, tenure: '12 months', status: 'Approved' },
  { id: 2, member: 'Rani Patil', amount: 18000, tenure: '8 months', status: 'Pending' },
  { id: 3, member: 'Sangita Rao', amount: 30000, tenure: '15 months', status: 'Overdue' }
];

const initialMeetings = [
  { id: 1, title: 'Monthly review', time: 'Tomorrow • 10:30 AM', note: 'Review of loans and savings' },
  { id: 2, title: 'Loan committee', time: 'Friday • 4:00 PM', note: 'Discuss new loan applications' }
];

const initialPayments = [
  { id: 1, member: 'Shanti Devi', amount: 3500, date: '2026-07-15', method: 'UPI', status: 'Paid' },
  { id: 2, member: 'Meera Bai', amount: 2100, date: '2026-07-12', method: 'Cash', status: 'Pending' }
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
      meetings: stored.meetings || initialMeetings,
      payments: stored.payments || initialPayments
    };
  }

  return {
    members: initialMembers,
    savings: initialSavings,
    loans: initialLoans,
    meetings: initialMeetings,
    payments: initialPayments
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
      loan: 'New',
      attendance: '100%',
      status: 'Active'
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
        type: 'Deposit'
      }, ...prev.savings],
      members: prev.members.map((member) => member.name === memberName ? { ...member, savings: member.savings + amount } : member)
    }));
  };

  const approveLoan = (loanId) => {
    setData((prev) => ({
      ...prev,
      loans: prev.loans.map((loan) => loan.id === loanId ? { ...loan, status: 'Approved' } : loan)
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

  const recordPayment = (paymentInput) => {
    const payment = {
      id: Date.now(),
      member: paymentInput.member,
      amount: Number(paymentInput.amount) || 0,
      date: new Date().toISOString().slice(0, 10),
      method: paymentInput.method || 'UPI',
      status: 'Paid'
    };
    setData((prev) => ({ ...prev, payments: [payment, ...prev.payments] }));
  };

  const askSakhiAI = (query) => getSakhiAIResponse(query, {
    members: data.members.length,
    activeLoans: data.loans.filter((loan) => loan.status === 'Approved').length,
    overdueLoans: data.loans.filter((loan) => loan.status === 'Overdue').length,
    totalSavings: data.savings.reduce((sum, item) => sum + item.amount, 0)
  });

  const value = useMemo(() => ({
    ...data,
    addMember,
    recordSavings,
    approveLoan,
    addMeeting,
    recordPayment,
    askSakhiAI
  }), [data]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  return useContext(AppDataContext);
}
