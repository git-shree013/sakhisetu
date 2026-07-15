import { CalendarClock, ClipboardList, ImagePlus } from 'lucide-react';
import { PageTransition } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';

export default function MeetingsPage() {
  const { t } = useLanguage();
  const { meetings } = useAppData();

  return (
    <PageTransition>
      <div className="page-shell" style={{padding:'1.2rem'}}>
        <div className="container">
          <div className="card" style={{padding:'1.2rem'}}>
            <div className="badge">{t('meetingsBadge')}</div>
            <h2 style={{margin:'0.55rem 0', fontFamily:'Poppins, sans-serif'}}>{t('meetingsTitle')}</h2>
            <div className="grid-2" style={{marginTop:'1rem'}}>
              <div className="card" style={{padding:'1rem', background:'#fcfbf8'}}>
                <div style={{display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'.7rem'}}><CalendarClock size={18} color="var(--accent)"/> {t('upcomingMeeting')}</div>
                <div style={{fontWeight:700}}>{meetings[0]?.title || t('monthlyReview')}</div>
                <div className="muted">{meetings[0]?.note || t('agendaText')}</div>
              </div>
              <div className="card" style={{padding:'1rem', background:'#fcfbf8'}}>
                <div style={{display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'.7rem'}}><ClipboardList size={18} color="var(--accent)"/> {t('attendanceLabel')}</div>
                <div style={{fontWeight:700}}>{t('attendanceValue')}</div>
                <div className="muted">{t('attendanceText')}</div>
              </div>
            </div>
            <div className="card" style={{padding:'1rem', background:'#fcfbf8', marginTop:'1rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'.7rem'}}><ImagePlus size={18} color="var(--accent)"/> {t('photoUploads')}</div>
              <div className="muted">{meetings.slice(0, 3).map((meeting) => <div key={meeting.id} style={{marginTop:'.4rem'}}>{meeting.title} • {meeting.time}</div>)}</div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
