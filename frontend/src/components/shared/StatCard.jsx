import Card from '../ui/Card';

export default function StatCard({ label, value, icon: Icon, accent = false }) {
  return (
    <Card hover={false} className="flex items-center gap-4">
      {Icon && (
        <div className={`clip-corner-sm flex h-11 w-11 shrink-0 items-center justify-center ${accent ? 'bg-ember-gradient text-white' : 'bg-surface-raised text-ink-muted'}`}>
          <Icon size={20} />
        </div>
      )}
      <div>
        <p className="font-display text-2xl text-ink">{value}</p>
        <p className="text-xs text-ink-muted">{label}</p>
      </div>
    </Card>
  );
}
