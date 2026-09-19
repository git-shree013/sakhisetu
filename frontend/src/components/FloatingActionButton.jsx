import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function FloatingActionButton({ onOpenModal }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', right: '1.2rem', bottom: '1.2rem', zIndex: 50 }}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} style={{ display: 'grid', gap: '.6rem', marginBottom: '.7rem' }}>
            <button className="btn btn-secondary" style={{ boxShadow: '0 12px 30px rgba(15,23,42,.1)' }} onClick={() => onOpenModal('member')}>New member</button>
            <button className="btn btn-secondary" style={{ boxShadow: '0 12px 30px rgba(15,23,42,.1)' }} onClick={() => onOpenModal('savings')}>Record savings</button>
            <button className="btn btn-secondary" style={{ boxShadow: '0 12px 30px rgba(15,23,42,.1)' }} onClick={() => onOpenModal('payment')}>Record payment</button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileTap={{ scale: 0.97 }} className="btn btn-primary" style={{ width: '56px', height: '56px', borderRadius: '50%', padding: 0, boxShadow: '0 22px 45px rgba(93,124,63,.24)' }} onClick={() => setOpen((prev) => !prev)}>
        <Plus size={20} />
      </motion.button>
    </div>
  );
}
