import { Landmark } from 'lucide-react';
import { PageTransition } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';

export default function LoansPage() {
  const { t } = useLanguage();
  const { loans, approveLoan } = useAppData();

  return (
    <PageTransition>
      <div className="page-shell" style={{padding:'1.2rem'}}>
        <div className="container">
          <div className="grid-2" style={{gap:'1rem'}}>
            <div className="card" style={{padding:'1.2rem'}}>
              <div className="badge">{t('loanBadge')}</div>
              <h2 style={{margin:'0.55rem 0', fontFamily:'Poppins, sans-serif'}}>{t('loanTitle')}</h2>
              <div className="grid-2" style={{marginTop:'1rem'}}>
                <div className="stat-card"><h3>{t('openRequests')}</h3><div className="value">14</div></div>
                <div className="stat-card"><h3>{t('recoveryRate')}</h3><div className="value">96%</div></div>
              </div>
            </div>
            <div className="card" style={{padding:'1.2rem'}}>
              <div className="badge">{t('repaymentTracker')}</div>
              <div style={{display:'grid', gap:'.85rem', marginTop:'1rem'}}>
                {loans.map((loan, idx) => <div key={idx} className="card" style={{padding:'.95rem', background:'#fefcf7'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div><div style={{fontWeight:700}}>{loan.member}</div><div className="muted">{loan.tenure}</div></div>
                    <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
                      <span className={`status-pill ${loan.status === 'मंजूर' ? 'status-approved' : loan.status === 'अतिदेय' ? 'status-overdue' : 'status-pending'}`}>{loan.status}</span>
                      {loan.status !== 'मंजूर' && <button className="btn btn-secondary" style={{padding:'0.4rem 0.7rem'}} onClick={() => approveLoan(loan.id)}>मंजूर करें</button>}
                    </div>
                  </div>
                  <div style={{marginTop:'.65rem', fontWeight:700, color:'var(--accent-dark)'}}>₹{loan.amount.toLocaleString('en-IN')}</div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
