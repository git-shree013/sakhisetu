import { useState } from 'react';
import { Bot, Send } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';

export default function SakhiAI() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'सखी AI: मैं आपकी मदद कर सकता हूँ। सदस्य जोड़ें, ऋण देखें या बचत अपडेट करें।' }]);
  const { askSakhiAI } = useAppData();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const reply = askSakhiAI(trimmedQuery);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: trimmedQuery },
      { role: 'assistant', content: reply.message }
    ]);
    setQuery('');
  };

  const placeholderText = 'उदाहरण: सदस्य जोड़ें';

  return (
    <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.75rem' }}>
        <Bot size={18} color="var(--accent)" />
        <strong>सखी AI सहायता</strong>
      </div>
      <div style={{ display: 'grid', gap: '.6rem', marginBottom: '.75rem' }}>
        {messages.map((message, idx) => <div key={idx} className="card" style={{ padding: '.75rem', background: message.role === 'assistant' ? '#f5f9f0' : '#fff' }}>{message.content}</div>)}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '.6rem' }}>
        <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholderText} style={{ flex: 1 }} />
        <button className="btn btn-primary" type="submit"><Send size={16} /></button>
      </form>
    </div>
  );
}
