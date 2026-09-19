import { CreditCard, TrendingUp } from 'lucide-react';
import { PageTransition } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';

export default function PaymentsPage() {
  const { t } = useLanguage();
  const { payments = [] } = useAppData();

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = payments.filter((payment) => payment.status === 'Pending').length;

  return (
    <PageTransition>
      <div className="page-shell" style={{ padding: '1.2rem' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '1rem' }}>
            <div className="card" style={{ padding: '1.2rem' }}>
              <div className="badge">{t('payments')}</div>
              <h2 style={{ margin: '0.55rem 0', fontFamily: 'Poppins, sans-serif' }}>{t('paymentHistory')}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <div>
                  <div className="value">₹{totalPayments.toLocaleString('en-IN')}</div>
                  <div className="muted">{t('totalPayments')}</div>
                </div>
                <div className="badge" style={{ background: '#eaf6e8' }}><TrendingUp size={15}/> {pendingPayments} pending</div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.2rem' }}>
              <div className="badge">{t('upcomingPayments')}</div>
              <div style={{ display: 'grid', gap: '.75rem', marginTop: '1rem' }}>
                {payments.length ? payments.map((payment, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.75rem 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{payment.member}</div>
                      <div className="muted">{payment.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700 }}>₹{payment.amount.toLocaleString('en-IN')}</div>
                      <span className={`status-pill ${payment.status === 'Paid' ? 'status-approved' : 'status-pending'}`}>{payment.status}</span>
                    </div>
                  </div>
                )) : (
                  <div className="muted">No payments recorded yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.2rem', marginTop: '1rem' }}>
            <div className="section-title">
              <h2 style={{ fontSize: '1.2rem' }}>{t('recordPayment')}</h2>
              <span className="muted"><CreditCard size={16} style={{ verticalAlign: 'middle', marginRight: '.4rem' }} /> UPI / Cash</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('memberColumn')}</th>
                    <th>{t('paymentDate')}</th>
                    <th>{t('paymentAmount')}</th>
                    <th>{t('paymentMethod')}</th>
                    <th>{t('paymentStatus')}</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length ? payments.map((payment, idx) => (
                    <tr key={idx}>
                      <td>{payment.member}</td>
                      <td>{payment.date}</td>
                      <td>₹{payment.amount.toLocaleString('en-IN')}</td>
                      <td>{payment.method || 'UPI'}</td>
                      <td><span className={`status-pill ${payment.status === 'Paid' ? 'status-approved' : 'status-pending'}`}>{payment.status}</span></td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5" className="muted">No payment entries available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
