import { motion } from 'framer-motion';
import { ArrowRight, Menu, Moon, Search, Sun, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar({ onOpenCommand }) {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  return (
    <header className="navbar">
      <div className="container topbar">
        <Link to="/" className="brand">
          <div className="brand-mark">S</div>
          <span>SakhiSetu</span>
        </Link>
        <nav className="nav-links">
          <a href="#features">{t('navFeatures')}</a>
          <a href="#how-it-works">{t('navHowItWorks')}</a>
          <a href="#stories">{t('navStories')}</a>
          <a href="#faq">{t('navFaq')}</a>
          <button className="btn btn-secondary" style={{padding:'0.75rem'}} onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}>{language === 'en' ? 'हिंदी' : 'EN'}</button>
          <button className="btn btn-secondary" style={{padding:'0.75rem'}} onClick={onOpenCommand}><Search size={16}/></button>
          <button className="btn btn-secondary" style={{padding:'0.75rem'}} onClick={toggleTheme}>{theme === 'light' ? <Moon size={16}/> : <Sun size={16}/>}</button>
          <Link to="/login" className="btn btn-secondary">{t('signIn')}</Link>
          <Link to="/dashboard" className="btn btn-primary">{t('openDashboard')} <ArrowRight size={16}/></Link>
        </nav>
        <button className="btn btn-secondary" style={{padding:'0.75rem'}}><Menu size={18}/></button>
      </div>
    </header>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="section-title">
      <div>
        <div className="badge" style={{marginBottom:'0.65rem'}}>{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export function PageTransition({ children }) {
  return (
    <motion.div initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} exit={{opacity:0, y:16}} transition={{duration:0.35}}>
      {children}
    </motion.div>
  );
}

export function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname.replace('/', '').split('/').filter(Boolean);
  const crumbs = path.length ? [{ label: 'Home', path: '/' }, ...path.map((item, index) => ({ label: item.replace('-', ' '), path: '/' + path.slice(0, index + 1).join('/') }))] : [{ label: 'Home', path: '/' }];

  return (
    <div className="container" style={{ marginBottom: '1rem' }}>
      <div className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}><Sparkles size={14}/> {crumbs.map((crumb, index) => <span key={crumb.path}>{index > 0 ? ' / ' : ''}<Link to={crumb.path}>{crumb.label}</Link></span>)}</div>
    </div>
  );
}
