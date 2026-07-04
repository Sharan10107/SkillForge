export default function EducationList({ education = [] }) {
  if (!education.length) return <p className="text-sm text-ink-muted">No education added yet.</p>;
  return (
    <div className="flex flex-col gap-4">
      {education.map((ed, i) => (
        <div key={i} className="border-l-2 border-ember-500 pl-4">
          <p className="font-display text-ink">{ed.degree}{ed.fieldOfStudy ? `, ${ed.fieldOfStudy}` : ''}</p>
          <p className="text-sm text-ink-muted">{ed.institution}</p>
          <p className="font-mono text-xs text-ink-muted">{ed.startYear} — {ed.endYear || 'Present'}</p>
        </div>
      ))}
    </div>
  );
}
