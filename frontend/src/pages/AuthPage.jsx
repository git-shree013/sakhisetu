import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Smartphone } from 'lucide-react';
import { PageTransition } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const authModes = {
  '/login': { titleKey: 'authLoginTitle', subtitleKey: 'authLoginSubtitle', buttonKey: 'authButtonLogin' },
  '/register': { titleKey: 'authRegisterTitle', subtitleKey: 'authRegisterSubtitle', buttonKey: 'authButtonRegister' },
  '/forgot-password': { titleKey: 'authForgotTitle', subtitleKey: 'authForgotSubtitle', buttonKey: 'authButtonForgot' },
  '/verify-email': { titleKey: 'authVerifyTitle', subtitleKey: 'authVerifySubtitle', buttonKey: 'authButtonVerify' },
  '/otp': { titleKey: 'authOtpTitle', subtitleKey: 'authOtpSubtitle', buttonKey: 'authButtonOtp' }
};

export default function AuthPage() {
  const location = useLocation();
  const { t } = useLanguage();
  const mode = authModes[location.pathname] || authModes['/login'];

  return (
    <PageTransition>
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-hero">
            <div>
              <div className="badge"><ShieldCheck size={15}/> {t('authTrust')}</div>
              <h2 style={{fontFamily:'Poppins, sans-serif', fontSize:'1.9rem', margin:'1rem 0 .6rem'}}>{t('authTitle')}</h2>
              <p className="muted">{t('authSubtitle')}</p>
            </div>
            <div className="card" style={{padding:'1rem', background:'rgba(255,255,255,.75)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'.7rem', marginBottom:'.5rem'}}><Smartphone size={18} color="var(--accent)"/> {t('authMobile')}</div>
              <div className="muted">{t('authMobileText')}</div>
            </div>
          </div>
          <div className="auth-form">
            <div className="brand">
              <div className="brand-mark">G</div>
              <span>GramSakhi</span>
            </div>
            <h3 style={{margin:'0.2rem 0 0', fontFamily:'Poppins, sans-serif'}}>{t(mode.titleKey)}</h3>
            <p className="muted" style={{margin:0}}>{t(mode.subtitleKey)}</p>
            <label style={{display:'grid', gap:'.35rem'}}>
              <span className="muted">{t('emailLabel')}</span>
              <div style={{display:'flex', alignItems:'center', gap:'.6rem', border:'1px solid var(--border)', borderRadius:'14px', padding:'0.8rem 0.9rem', background:'white'}}>
                <Mail size={16} />
                <input className="input" style={{border:'none', padding:0}} placeholder={t('emailPlaceholder')} />
              </div>
            </label>
            {location.pathname !== '/forgot-password' && location.pathname !== '/verify-email' && <label style={{display:'grid', gap:'.35rem'}}>
              <span className="muted">{t('passwordLabel')}</span>
              <div style={{display:'flex', alignItems:'center', gap:'.6rem', border:'1px solid var(--border)', borderRadius:'14px', padding:'0.8rem 0.9rem', background:'white'}}>
                <LockKeyhole size={16} />
                <input className="input" style={{border:'none', padding:0}} type="password" placeholder={t('passwordPlaceholder')} />
              </div>
            </label>}
            <button className="btn btn-primary">{t(mode.buttonKey)} <ArrowRight size={16}/></button>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'.6rem'}}>
              <Link to="/forgot-password" className="muted">{t('forgotPassword')}</Link>
              <Link to="/register" className="muted">{t('createAccount')}</Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
