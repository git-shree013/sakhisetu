import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { PageTransition } from '../components/Layout';

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <div className="page-shell" style={{padding:'1.2rem'}}>
        <div className="container">
          <div className="card" style={{padding:'1.2rem'}}>
            <div className="badge">विश्लेषण</div>
            <h2 style={{margin:'0.55rem 0', fontFamily:'Poppins, sans-serif'}}>विकास और समाजिक असर को समझने के लिए आसान आंकड़े</h2>
            <div className="grid-3" style={{marginTop:'1rem'}}>
              <div className="card" style={{padding:'1rem'}}><div style={{display:'flex', alignItems:'center', gap:'.6rem'}}><TrendingUp size={18} color="var(--accent)"/> Savings trend</div><div className="skeleton" style={{height:'120px', marginTop:'1rem'}} /></div>
              <div className="card" style={{padding:'1rem'}}><div style={{display:'flex', alignItems:'center', gap:'.6rem'}}><BarChart3 size={18} color="var(--accent)"/> Loan recovery</div><div className="skeleton" style={{height:'120px', marginTop:'1rem'}} /></div>
              <div className="card" style={{padding:'1rem'}}><div style={{display:'flex', alignItems:'center', gap:'.6rem'}}><BarChart3 size={18} color="var(--accent)"/> गाँव का प्रदर्शन</div><div className="skeleton" style={{height:'120px', marginTop:'1rem'}} /></div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
