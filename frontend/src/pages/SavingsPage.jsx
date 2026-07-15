import { TrendingUp } from 'lucide-react';
import { PageTransition } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';

export default function SavingsPage() {
  const { t } = useLanguage();
  const { savings, members } = useAppData();
  const totalSavings = members.reduce((sum, member) => sum + member.savings, 0);

  return (
    <PageTransition>
      <div className="page-shell" style={{padding:'1.2rem'}}>
        <div className="container">
          <div className="grid-2" style={{gap:'1rem'}}>
            <div className="card" style={{padding:'1.2rem'}}>
              <div className="badge">{t('savingsBadge')}</div>
              <h2 style={{margin:'0.55rem 0', fontFamily:'Poppins, sans-serif'}}>{t('savingsTitle')}</h2>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1rem'}}>
                <div><div className="value">₹{totalSavings.toLocaleString('en-IN')}</div><div className="muted">{t('monthBalance')}</div></div>
                <div className="badge" style={{background:'#eaf6e8'}}><TrendingUp size={15}/> +11.8%</div>
              </div>
            </div>
            <div className="card" style={{padding:'1.2rem'}}>
              <div className="badge">{t('transactionHistory')}</div>
              <div style={{display:'grid', gap:'.75rem', marginTop:'1rem'}}>
                {savings.map((tx, idx) => <div key={idx} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'.75rem 0', borderBottom:'1px solid var(--border)'}}>
                  <div>
                    <div style={{fontWeight:700}}>{tx.type}</div>
                    <div className="muted">{tx.member} • {tx.date}</div>
                  </div>
                  <div style={{fontWeight:700}}>₹{tx.amount.toLocaleString('en-IN')}</div>
                </div>)}
              </div>
            </div>
          </div>
          <div className="card" style={{padding:'1.2rem', marginTop:'1rem'}}>
            <div className="section-title">
              <h2 style={{fontSize:'1.2rem'}}>{t('depositRecords')}</h2>
              <a href="#" className="muted">{t('exportLabel')}</a>
            </div>
            <div style={{overflowX:'auto'}}>
              <table className="table">
                <thead><tr><th>{t('memberColumn')}</th><th>{t('dateColumn')}</th><th>{t('amountColumn')}</th><th>{t('statusColumn')}</th></tr></thead>
                <tbody>
                  {savings.map((tx) => <tr key={tx.id}><td>{tx.member}</td><td>{tx.date}</td><td>₹{tx.amount.toLocaleString('en-IN')}</td><td><span className="status-pill status-approved">साफ</span></td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
