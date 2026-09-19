import { Search, UserRoundPlus } from 'lucide-react';
import { PageTransition } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';

export default function MembersPage() {
  const { t } = useLanguage();
  const { members } = useAppData();

  return (
    <PageTransition>
      <div className="page-shell" style={{padding:'1.4rem'}}>
        <div className="container">
          <div className="card" style={{padding:'1.3rem'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem', flexWrap:'wrap'}}>
              <div>
                <div className="badge">{t('membersBadge')}</div>
                <h2 style={{margin:'0.4rem 0 0', fontFamily:'Poppins, sans-serif'}}>{t('membersTitle')}</h2>
              </div>
              <div style={{display:'flex', gap:'.6rem'}}>
                <label style={{display:'flex', alignItems:'center', gap:'.5rem', padding:'0.75rem 1rem', borderRadius:'999px', border:'1px solid var(--border)', background:'white'}}>
                  <Search size={16} />
                  <input className="input" style={{border:'none', padding:0, width:'180px'}} placeholder={t('searchMember')} />
                </label>
                <button className="btn btn-primary"><UserRoundPlus size={16}/> {t('addMember')}</button>
              </div>
            </div>
            <div style={{marginTop:'1rem', overflowX:'auto'}}>
              <table className="table">
                <thead>
                  <tr><th>{t('memberColumn')}</th><th>Phone</th><th>{t('savingsColumn')}</th><th>{t('loanColumn')}</th><th>{t('attendanceColumn')}</th><th>{t('statusColumn')}</th></tr>
                </thead>
                <tbody>
                  {members.map((member, idx) => <tr key={idx}>
                    <td>
                      <div style={{display:'flex', alignItems:'center', gap:'.8rem'}}>
                        <div style={{width:'42px', height:'42px', borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-soft), var(--blue))', display:'grid', placeItems:'center', fontWeight:700}}>{member.name.split(' ').map(x=>x[0]).join('')}</div>
                        <div>
                          <div style={{fontWeight:700}}>{member.name}</div>
                          <div className="muted">SHG leader</div>
                        </div>
                      </div>
                    </td>
                    <td>{member.phone}</td>
                    <td>₹{member.savings.toLocaleString('en-IN')}</td>
                    <td><span className={`status-pill ${member.loan === 'Approved' || member.loan === 'Open' ? 'status-approved' : 'status-pending'}`}>{member.loan}</span></td>
                    <td>{member.attendance}</td>
                    <td>{member.status}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
