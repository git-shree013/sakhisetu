import { motion } from 'framer-motion';
import { BarChart, Bell, Brain, CalendarDays, ChevronRight, CircleDollarSign, FileText, Landmark, Plus, Search, Settings, TrendingUp, Users, Wallet2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/Layout';
import SakhiAI from '../components/SakhiAI';
import { useLanguage } from '../contexts/LanguageContext';

const cards = [
  { title: 'Total Members', value: '1,248', change: '+12.4%', icon: Users },
  { title: 'Total Savings', value: '₹24.8L', change: '+8.2%', icon: Wallet2 },
  { title: 'Active Loans', value: '184', change: '+5.1%', icon: Landmark },
  { title: 'Monthly Collection', value: '₹4.6L', change: '+14.3%', icon: CircleDollarSign }
];

const activities = [
  { title: 'Shanti Devi deposited ₹3,500', time: '8 minutes ago', tone: 'approved' },
  { title: 'Meera Bai loan request approved', time: '1 hour ago', tone: 'approved' },
  { title: 'Meeting list updated', time: '4 hours ago', tone: 'pending' },
  { title: 'Repayment reminder note created', time: 'Tomorrow', tone: 'pending' }
];

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="brand" style={{marginBottom:'1.6rem'}}>
            <div className="brand-mark">S</div>
            <span>SakhiSetu</span>
          </div>
          <Link className="active" to="/dashboard"><TrendingUp size={18}/> Dashboard</Link>
          <Link to="/members"><Users size={18}/> Members</Link>
          <Link to="/savings"><Wallet2 size={18}/> Savings</Link>
          <Link to="/loans"><Landmark size={18}/> Loans</Link>
          <Link to="/meetings"><CalendarDays size={18}/> Meetings</Link>
          <Link to="/reports"><FileText size={18}/> Reports</Link>
          <Link to="/analytics"><BarChart size={18}/> Analytics</Link>
          <Link to="/login"><Settings size={18}/> Sign Out</Link>
        </aside>
        <main className="main-content">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem', marginBottom:'1.2rem', flexWrap:'wrap'}}>
            <div>
              <div className="badge">{t('overviewBadge')}</div>
              <h2 style={{margin:'0.4rem 0 0', fontFamily:'Poppins, sans-serif'}}>{t('dashboardTitle')}</h2>
            </div>
            <div style={{display:'flex', gap:'.6rem', alignItems:'center'}}>
              <button className="btn btn-secondary"><Search size={16}/></button>
              <button className="btn btn-secondary"><Bell size={16}/></button>
              <Link to="/members" className="btn btn-primary"><Plus size={16}/> {t('newMember')}</Link>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="grid-2" style={{gap:'1rem'}}>
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return <motion.div key={idx} whileHover={{y:-4}} className="stat-card">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3>{card.title}</h3>
                    <div className="brand-mark" style={{width:'36px', height:'36px', borderRadius:'12px'}}><Icon size={16}/></div>
                  </div>
                  <div className="value" style={{marginTop:'0.25rem'}}>{card.value}</div>
                  <div className="muted" style={{fontSize:'.9rem'}}>{card.change} from last month</div>
                </motion.div>;
              })}
            </div>
            <div className="card" style={{padding:'1.2rem'}}>
              <div className="section-title" style={{marginBottom:'1rem'}}>
                <h2 style={{fontSize:'1.2rem'}}>{t('upcomingMeetings')}</h2>
                <a href="#" className="muted">{t('viewAll')}</a>
              </div>
              <div style={{display:'grid', gap:'.8rem'}}>
                {['Monthly Review', 'Loan Committee', 'Savings Circle'].map((item, idx) => <div key={idx} className="card" style={{padding:'.9rem', background:'#fdfcf7'}}>
                  <div style={{fontWeight:700}}>{item}</div>
                  <div className="muted">Tomorrow • 10:30 AM</div>
                </div>)}
              </div>
            </div>
          </div>

          <div className="grid-2" style={{marginTop:'1.2rem', gap:'1rem'}}>
            <div className="card" style={{padding:'1.2rem'}}>
              <div className="section-title">
                <h2 style={{fontSize:'1.2rem'}}>{t('recentActivity')}</h2>
                <a href="#" className="muted">{t('syncLabel')}</a>
              </div>
              <div style={{display:'grid', gap:'.8rem'}}>
                {activities.map((item, idx) => <div key={idx} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'.8rem 0', borderBottom:'1px solid var(--border)'}}>
                  <div>
                    <div style={{fontWeight:700}}>{item.title}</div>
                    <div className="muted">{item.time}</div>
                  </div>
                  <span className={`status-pill ${item.tone === 'approved' ? 'status-approved' : 'status-pending'}`}>{item.tone === 'approved' ? 'Approved' : 'Pending'}</span>
                </div>)}
              </div>
            </div>
            <div className="card" style={{padding:'1.2rem'}}>
              <div className="section-title">
                <h2 style={{fontSize:'1.2rem'}}>{t('quickActionsTitle')}</h2>
              </div>
              <div style={{display:'grid', gap:'.75rem'}}>
                {[t('actionMember'), t('actionDeposit'), t('actionLoan'), t('actionMeeting')].map((action, idx) => <button key={idx} className="btn btn-secondary" style={{justifyContent:'space-between', padding:'0.9rem 1rem'}}><span>{action}</span><ChevronRight size={16}/></button>)}
              </div>
              <div className="card" style={{marginTop:'1rem', padding:'1rem', background:'linear-gradient(135deg, rgba(93,124,63,0.08), rgba(142,179,196,0.12))'}}>
                <div style={{display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'.45rem'}}><Brain size={16} color="var(--accent)"/><strong>{t('aiPanelTitle')}</strong></div>
                <p className="muted" style={{margin:'0 0 .7rem'}}>{t('aiPanelText')}</p>
                <button className="btn btn-primary">{t('actionPrompt')}</button>
              </div>
              <SakhiAI />
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
