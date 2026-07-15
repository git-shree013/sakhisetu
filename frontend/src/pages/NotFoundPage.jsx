import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="auth-shell">
      <div className="card" style={{padding:'2rem', textAlign:'center'}}>
        <h1 style={{fontFamily:'Poppins, sans-serif', marginBottom:'.5rem'}}>Page not found</h1>
        <p className="muted">The link you followed may be outdated or moved.</p>
        <Link to="/" className="btn btn-primary" style={{marginTop:'1rem'}}><ArrowLeft size={16}/> Return home</Link>
      </div>
    </div>
  );
}
