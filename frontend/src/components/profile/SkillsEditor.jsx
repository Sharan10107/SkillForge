import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Button from '../ui/Button';

export default function SkillsEditor({ skills = [], onChange }) {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const val = input.trim();
    if (val && !skills.includes(val)) onChange([...skills, val]);
    setInput('');
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="flex items-center gap-1 rounded-full bg-surface-raised px-3 py-1 text-sm text-ink">
            {s}
            <button onClick={() => onChange(skills.filter((x) => x !== s))} aria-label={`Remove ${s}`}>
              <FiX size={14} className="text-ink-muted hover:text-danger" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          placeholder="Add a skill and press Enter"
          className="flex-1 rounded-md border border-border bg-surface px-3.5 py-2 text-sm outline-none focus:border-ember-500"
        />
        <Button type="button" variant="secondary" size="sm" onClick={addSkill}>Add</Button>
      </div>
    </div>
  );
}
