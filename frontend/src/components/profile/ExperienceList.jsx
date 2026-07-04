export default function ExperienceList({ experience = [] }) {
  if (!experience.length) return <p className="text-sm text-ink-muted">No experience added yet.</p>;
  return (
    <div className="flex flex-col gap-4">
      {experience.map((exp, i) => (
        <div key={i} className="border-l-2 border-steel-500 pl-4">
          <p className="font-display text-ink">{exp.role}</p>
          <p className="text-sm text-ink-muted">{exp.company}</p>
          {exp.description && <p className="mt-1 text-sm text-ink-muted">{exp.description}</p>}
        </div>
      ))}
    </div>
  );
}
