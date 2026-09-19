import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Brain, CreditCard, Landmark, MessageCircleHeart, ShieldCheck, Sparkles, Users, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader, PageTransition } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const stats = [
  { label: 'SHG digitized', value: '4.8k+' },
  { label: 'Rural members', value: '182k' },
  { label: 'Loan recovery', value: '96.4%' },
  { label: 'Time saved', value: '12 hrs' }
];

const features = [
  { title: 'Member information in one place', description: 'Track member profiles, attendance, savings, and loan health from a single view.', icon: Users },
  { title: 'Secure savings workflow', description: 'Keep deposits, weekly collections, and transaction records organized and reliable.', icon: Wallet },
  { title: 'Simplified loan operations', description: 'Review loan requests, installments, and recovery status without friction.', icon: CreditCard },
  { title: 'Clear insights', description: 'Understand trends, savings, and growth indicators quickly and confidently.', icon: BarChart3 }
];

const steps = [
  { title: 'Create your SHG profile', text: 'Set up your group, members, and governance rules in a few guided steps.' },
  { title: 'Digitize collections', text: 'Capture savings, dues, and meeting updates instantly from the field.' },
  { title: 'Make quick decisions', text: 'Use dashboards and reports to manage lending, planning, and day-to-day operations.' }
];

const testimonials = [
  { quote: 'SakhiSetu made our village savings and loan tracking clear, simple, and trustworthy.', name: 'Anita Devi', role: 'Program Officer, SEWA' },
  { quote: 'This dashboard makes it easy to understand monthly operations and decisions in minutes.', name: 'Ravi Kumar', role: 'Finance Lead, Rural Futures' }
];

const gallery = [
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="page-shell">
        <main>
          <section className="hero container">
            <div className="grid-2" style={{alignItems:'center'}}>
              <motion.div initial={{opacity:0, x:-24}} animate={{opacity:1, x:0}} transition={{duration:0.45}}>
                <div className="badge"><Sparkles size={15}/> {t('heroBadge')}</div>
                <h1>{t('heroTitle')}</h1>
                <p>{t('heroSubtitle')}</p>
                <div style={{display:'flex', gap:'1rem', marginTop:'1.4rem', flexWrap:'wrap'}}>
                  <Link to="/register" className="btn btn-primary">{t('getStarted')} <ArrowRight size={16}/></Link>
                  <a href="#features" className="btn btn-secondary">{t('learnMore')}</a>
                </div>
                <div className="grid-4" style={{marginTop:'1.4rem'}}>
                  {stats.map((s, idx) => <div key={idx} className="stat-card"><h3>{s.label}</h3><div className="value">{s.value}</div></div>)}
                </div>
              </motion.div>
              <motion.div initial={{opacity:0, x:24}} animate={{opacity:1, x:0}} transition={{duration:0.45}} className="hero-visual" style={{backgroundImage:'url(https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80)', backgroundSize:'cover', backgroundPosition:'center'}}>
                <div className="hero-overlay" />
                <div className="hero-content">
                  <div className="badge" style={{width:'fit-content', background:'rgba(255,255,255,.16)', color:'white', border:'1px solid rgba(255,255,255,.18)'}}><ShieldCheck size={15}/> Safe and simple to use</div>
                  <h3 style={{fontSize:'1.6rem', margin:'1rem 0 .4rem'}}>Built for the real needs of villages and fields</h3>
                  <p style={{margin:0, color:'rgba(255,255,255,.8)'}}>Savings, meetings, and loan operations can now be managed from the field with ease and confidence.</p>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="features" className="section container">
            <SectionHeader eyebrow={t('aboutEyebrow')} title={t('aboutTitle')} subtitle={t('aboutSubtitle')} />
            <div className="grid-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return <motion.article key={index} whileHover={{y:-6, scale:1.01}} className="card" style={{padding:'1.4rem'}}>
                  <div className="brand-mark" style={{marginBottom:'1rem'}}><Icon size={18}/></div>
                  <h3 style={{margin:'0 0 .45rem', fontSize:'1.1rem'}}>{feature.title}</h3>
                  <p className="muted" style={{margin:0}}>{feature.description}</p>
                </motion.article>;
              })}
            </div>
          </section>

          <section className="section container">
            <div className="card" style={{padding:'1.35rem', background:'linear-gradient(135deg, rgba(93,124,63,0.08), rgba(142,179,196,0.12))'}}>
              <div className="grid-2" style={{alignItems:'center'}}>
                <div>
                  <div className="badge"><Brain size={15}/> {t('aiSectionTitle')}</div>
                  <h2 style={{fontFamily:'Poppins, sans-serif', fontSize:'1.45rem', margin:'0.8rem 0'}}>{t('aiSectionTitle')}</h2>
                  <p className="muted">{t('aiSectionSubtitle')}</p>
                </div>
                <div className="grid-2">
                  <div className="stat-card"><h3>{t('aiCard1Title')}</h3><div className="value" style={{fontSize:'0.95rem'}}>{t('aiCard1Text')}</div></div>
                  <div className="stat-card"><h3>{t('aiCard2Title')}</h3><div className="value" style={{fontSize:'0.95rem'}}>{t('aiCard2Text')}</div></div>
                  <div className="stat-card"><h3>{t('aiCard3Title')}</h3><div className="value" style={{fontSize:'0.95rem'}}>{t('aiCard3Text')}</div></div>
                  <div className="stat-card"><h3>Assistive Flow</h3><div className="value" style={{fontSize:'0.95rem'}}>Auto-generated reminders for field officers.</div></div>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="section container">
            <SectionHeader eyebrow={t('howItWorksEyebrow')} title="Simple, reliable, and built for field work" subtitle="Every step is designed to be quick to learn and easy to use." />
            <div className="grid-3">
              {steps.map((step, idx) => <div key={idx} className="card" style={{padding:'1.3rem'}}>
                <div className="badge" style={{marginBottom:'0.85rem'}}>0{idx+1}</div>
                <h3 style={{margin:'0 0 .4rem'}}>{step.title}</h3>
                <p className="muted" style={{margin:0}}>{step.text}</p>
              </div>)}
            </div>
          </section>

          <section className="section container">
            <div className="card" style={{padding:'1.5rem', background:'linear-gradient(135deg, rgba(93,124,63,0.08), rgba(142,179,196,0.12))'}}>
              <div className="grid-2" style={{alignItems:'center'}}>
                <div>
                  <div className="badge"><Landmark size={15}/> Ready for public-sector workflows</div>
                  <h2 style={{fontFamily:'Poppins, sans-serif', fontSize:'1.6rem', margin:'0.8rem 0'}}>Built for transparency, reporting, and trust</h2>
                  <p className="muted">A system that scales from one village to many districts while staying clear, practical, and dependable.</p>
                </div>
                <div className="grid-2">
                  <div className="stat-card"><h3>Scheme Mapping</h3><div className="value">24+</div></div>
                  <div className="stat-card"><h3>District Reach</h3><div className="value">18</div></div>
                  <div className="stat-card"><h3>Monthly Reports</h3><div className="value">1.2k</div></div>
                  <div className="stat-card"><h3>Audit Trails</h3><div className="value">24/7</div></div>
                </div>
              </div>
            </div>
          </section>

          <section id="stories" className="section container">
            <SectionHeader eyebrow={t('successEyebrow')} title="Trusted by teams building real impact" subtitle="The voices of community organizations that rely on clear, consistent operations." />
            <div className="grid-2">
              {testimonials.map((item, idx) => <div key={idx} className="card" style={{padding:'1.35rem'}}>
                <div style={{display:'flex', gap:'.6rem', alignItems:'center', marginBottom:'0.9rem'}}><MessageCircleHeart size={18} color="var(--accent)"/><span className="badge">Community Voice</span></div>
                <p style={{fontSize:'1.04rem', color:'#334155', margin:'0 0 1rem'}}>“{item.quote}”</p>
                <div style={{fontWeight:700}}>{item.name}</div>
                <div className="muted">{item.role}</div>
              </div>)}
            </div>
          </section>

          <section className="section container">
            <SectionHeader eyebrow={t('galleryEyebrow')} title="A platform that reflects real community life" subtitle="Every experience is designed to feel human, calm, and credible." />
            <div className="grid-3">
              {gallery.map((src, idx) => <motion.img key={idx} whileHover={{scale:1.02}} src={src} alt="SakhiSetu community" style={{borderRadius:'24px', height:'240px', objectFit:'cover', boxShadow:'0 20px 40px rgba(15,23,42,.08)'}} />)}
            </div>
          </section>

          <section id="faq" className="section container">
            <SectionHeader eyebrow={t('faqEyebrow')} title={t('faqTitle')} subtitle={t('faqSubtitle')} />
            <div className="grid-2">
              <div className="card" style={{padding:'1.2rem'}}>
                <h3 style={{marginTop:0}}>{t('faqQuestionOne')}</h3>
                <p className="muted">{t('faqAnswerOne')}</p>
              </div>
              <div className="card" style={{padding:'1.2rem'}}>
                <h3 style={{marginTop:0}}>{t('faqQuestionTwo')}</h3>
                <p className="muted">{t('faqAnswerTwo')}</p>
              </div>
            </div>
          </section>
        </main>

        <footer style={{padding:'3rem 0 2rem', borderTop:'1px solid var(--border)'}}>
          <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem', flexWrap:'wrap'}}>
            <div>
              <div className="brand" style={{marginBottom:'0.35rem'}}><div className="brand-mark">S</div><span>SakhiSetu</span></div>
              <div className="muted">Simple digital support for self-help groups in rural communities.</div>
            </div>
            <div className="muted">© 2026 SakhiSetu. Built for transparency and progress.</div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
