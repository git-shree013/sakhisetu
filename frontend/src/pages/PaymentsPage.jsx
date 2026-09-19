import { CircleDollarSign } from 'lucide-react';
import { PageTransition } from '../components/Layout';
import { useAppData } from '../contexts/AppDataContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function PaymentsPage() {
  const { payments = [] } = useAppData();
  const { t } = useLanguage();
  const total = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  return (
    <PageTransition>
      <div className="page-shell" style={{ padding: '1.2rem' }}>
        <div className="container">
          <div className="card" style={{ padding: '1.2rem' }}>
            <div className="badge"><CircleDollarSign size={15} /> {t('payments')}</div>
            <h2 style={{ margin: '.55rem 0', fontFamily: 'Poppins, sans-serif' }}>{t('paymentHistory')}</h2>
            <div className="grid-2" style={{ marginTop: '1rem' }}>
              <div className="stat-card"><h3>{t('totalPayments')}</h3><div className="value">₹{total.toLocaleString('en-IN')}</div></div>
              <div className="stat-card"><h3>{t('upcomingPayments')}</h3><div className="value">{payments.filter((payment) => payment.status === 'Pending').length}</div></div>
            </div>
            <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
              <table className="table">
                <thead><tr><th>Member</th><th>{t('paymentAmount')}</th><th>{t('paymentDate')}</th><th>{t('paymentMethod')}</th><th>{t('paymentStatus')}</th></tr></thead>
                <tbody>{payments.map((payment) => <tr key={payment.id}><td>{payment.member}</td><td>₹{Number(payment.amount).toLocaleString('en-IN')}</td><td>{payment.date}</td><td>{payment.method}</td><td><span className={`status-pill ${payment.status === 'Paid' ? 'status-approved' : 'status-pending'}`}>{payment.status}</span></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
