import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Breadcrumbs } from './components/Layout';
import CommandPalette from './components/CommandPalette';
import FloatingActionButton from './components/FloatingActionButton';
import Modal from './components/Modal';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import SavingsPage from './pages/SavingsPage';
import LoansPage from './pages/LoansPage';
import MeetingsPage from './pages/MeetingsPage';
import ReportsPage from './pages/ReportsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PaymentsPage from './pages/PaymentsPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAppData } from './contexts/AppDataContext';

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('member');
  const [form, setForm] = useState({ name: '', phone: '', village: '', savings: '', member: '', amount: '', title: '', time: '', note: '' });
  const { addMember, recordSavings, addMeeting, recordPayment } = useAppData();

  const openModal = (mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const submitQuickAction = (event) => {
    event.preventDefault();
    if (modalMode === 'member') {
      addMember({ name: form.name, phone: form.phone, village: form.village, savings: form.savings });
    }
    if (modalMode === 'savings') {
      recordSavings({ member: form.member, amount: form.amount });
    }
    if (modalMode === 'meeting') {
      addMeeting({ title: form.title, time: form.time, note: form.note });
    }
    if (modalMode === 'payment') {
      recordPayment({ member: form.member, amount: form.amount, method: 'UPI' });
    }
    setModalOpen(false);
    setForm({ name: '', phone: '', village: '', savings: '', member: '', amount: '', title: '', time: '', note: '' });
  };

  return (
    <>
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/forgot-password" element={<AuthPage />} />
        <Route path="/verify-email" element={<AuthPage />} />
        <Route path="/otp" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} onOpen={() => setCommandOpen(true)} />
      <FloatingActionButton onOpenModal={openModal} />
      <Modal open={modalOpen} title={modalMode === 'member' ? 'Add new member' : modalMode === 'savings' ? 'Record savings' : modalMode === 'payment' ? 'Record payment' : 'Add meeting'} onClose={() => setModalOpen(false)}>
        <form onSubmit={submitQuickAction} style={{ display: 'grid', gap: '.8rem' }}>
          {modalMode === 'member' && (<>
            <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="input" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            <input className="input" placeholder="Village" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} required />
            <input className="input" placeholder="Opening savings" value={form.savings} onChange={(e) => setForm({ ...form, savings: e.target.value })} />
          </>) }
          {modalMode === 'savings' && (<>
            <input className="input" placeholder="Member name" value={form.member} onChange={(e) => setForm({ ...form, member: e.target.value })} required />
            <input className="input" placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </>) }
          {modalMode === 'payment' && (<>
            <input className="input" placeholder="Member name" value={form.member} onChange={(e) => setForm({ ...form, member: e.target.value })} required />
            <input className="input" placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </>) }
          {modalMode === 'meeting' && (<>
            <input className="input" placeholder="Meeting title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <input className="input" placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
            <input className="input" placeholder="Notes" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} required />
          </>) }
          <button className="btn btn-primary" type="submit">Save</button>
        </form>
      </Modal>
    </>
  );
}

export default App;
