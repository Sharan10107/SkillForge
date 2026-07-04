export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative px-4 py-2.5 font-display text-sm transition-colors ${
            active === tab.value ? 'text-ember-600' : 'text-ink-muted hover:text-ink'
          }`}
        >
          {tab.label}
          {active === tab.value && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-ember-gradient" />
          )}
        </button>
      ))}
    </div>
  );
}
