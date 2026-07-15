import { AnimatePresence, motion } from 'framer-motion';
import { Command, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const shortcuts = [
  { label: 'डैशबोर्ड', path: '/dashboard' },
  { label: 'सदस्य', path: '/members' },
  { label: 'बचत', path: '/savings' },
  { label: 'ऋण', path: '/loans' },
  { label: 'बैठकें', path: '/meetings' }
];

export default function CommandPalette({ open, onClose, onOpen }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpen();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.45)', zIndex: 60, display: 'grid', placeItems: 'center', padding: '1rem' }} onClick={onClose}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ width: 'min(620px, 100%)', background: 'white', borderRadius: '24px', padding: '1rem', boxShadow: '0 24px 60px rgba(15,23,42,.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.7rem .8rem', border: '1px solid var(--border)', borderRadius: '16px' }}>
              <Search size={16} />
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="पेज या सेक्शन खोजें" style={{ border: 'none', outline: 'none', width: '100%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '.35rem', color: 'var(--muted)' }}><Command size={14} /> <span style={{ fontSize: '.8rem' }}>Ctrl K</span></div>
            </div>
            <div style={{ display: 'grid', gap: '.5rem', marginTop: '.8rem' }}>
              {shortcuts.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).map((item) => <Link key={item.path} to={item.path} onClick={onClose} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.8rem .9rem', borderRadius: '14px', background: 'var(--surface-2)' }}>{item.label}<span className="muted">खोलें</span></Link>)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
