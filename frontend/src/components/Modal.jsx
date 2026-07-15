import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.48)', zIndex: 70, display: 'grid', placeItems: 'center', padding: '1rem' }} onClick={onClose}>
          <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ width: 'min(560px, 100%)', background: 'white', borderRadius: '24px', padding: '1.2rem', boxShadow: '0 24px 60px rgba(15,23,42,.22)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.8rem' }}>
              <h3 style={{ margin: 0, fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
              <button className="btn btn-secondary" style={{ padding: '.55rem' }} onClick={onClose}><X size={16} /></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
