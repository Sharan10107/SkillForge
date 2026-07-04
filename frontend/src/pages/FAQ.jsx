import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const faqs = [
  { q: 'Is SkillForge free for students?', a: 'Yes. Creating a profile, publishing projects, and building your public portfolio is free.' },
  { q: 'Can recruiters see my portfolio without an account?', a: 'Yes — your public portfolio page is viewable by anyone with the link, as long as you keep it public in Settings.' },
  { q: 'Can I feature private/unfinished projects?', a: 'You can save a project as a draft, which keeps it hidden from Explore and your public portfolio until you publish it.' },
  { q: 'How do I remove a project?', a: 'Open My Projects from your dashboard and delete it — this is permanent.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-display text-3xl text-ink">Frequently asked questions</h1>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="surface-panel clip-corner-sm rounded-sm p-4">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between text-left font-display text-ink"
              >
                {f.q}
                <FiChevronDown className={`transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && <p className="mt-3 text-sm text-ink-muted">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
