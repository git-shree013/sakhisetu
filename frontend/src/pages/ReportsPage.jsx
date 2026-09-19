import { motion } from 'framer-motion';
import { FileDown, FileText } from 'lucide-react';
import { PageTransition } from '../components/Layout';

export default function ReportsPage() {
  return (
    <PageTransition>
      <div className="page-shell" style={{padding:'1.2rem'}}>
        <div className="container">
          <div className="card" style={{padding:'1.2rem'}}>
            <div className="badge">Reports</div>
            <h2 style={{margin:'0.55rem 0', fontFamily:'Poppins, sans-serif'}}>Create clear reports for partners and officials</h2>
            <div className="grid-3" style={{marginTop:'1rem'}}>
              {['PDF', 'Excel', 'CSV'].map((format) => <div key={format} className="card" style={{padding:'1rem'}}>
                <div style={{display:'flex', alignItems:'center', gap:'.6rem'}}><FileText size={18} color="var(--accent)"/> {format}</div>
                <p className="muted" style={{marginTop:'.75rem'}}>Download any report in a clean and simple format.</p>
                <button className="btn btn-primary" style={{marginTop:'.85rem'}}><FileDown size={16}/> Download</button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
