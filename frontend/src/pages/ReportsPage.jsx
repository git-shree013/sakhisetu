import { motion } from 'framer-motion';
import { FileDown, FileText } from 'lucide-react';
import { PageTransition } from '../components/Layout';

export default function ReportsPage() {
  return (
    <PageTransition>
      <div className="page-shell" style={{padding:'1.2rem'}}>
        <div className="container">
          <div className="card" style={{padding:'1.2rem'}}>
            <div className="badge">रिपोर्ट्स</div>
            <h2 style={{margin:'0.55rem 0', fontFamily:'Poppins, sans-serif'}}>भागीदारों और अधिकारियों के लिए साफ रिपोर्ट तैयार करें</h2>
            <div className="grid-3" style={{marginTop:'1rem'}}>
              {['PDF', 'Excel', 'CSV'].map((format) => <div key={format} className="card" style={{padding:'1rem'}}>
                <div style={{display:'flex', alignItems:'center', gap:'.6rem'}}><FileText size={18} color="var(--accent)"/> {format}</div>
                <p className="muted" style={{marginTop:'.75rem'}}>किसी भी रिपोर्ट को आसान और साफ़ तरीके से डाउनलोड करें।</p>
                <button className="btn btn-primary" style={{marginTop:'.85rem'}}><FileDown size={16}/> डाउनलोड करें</button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
