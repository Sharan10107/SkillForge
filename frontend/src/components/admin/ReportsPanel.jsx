import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ReportsPanel({ reports = [], onResolve }) {
  if (!reports.length) return <p className="text-sm text-ink-muted">No reports to review.</p>;
  return (
    <div className="flex flex-col gap-3">
      {reports.map((r) => (
        <div key={r._id} className="surface-panel clip-corner-sm flex items-center justify-between rounded-sm p-4">
          <div>
            <p className="text-sm text-ink">{r.reason}</p>
            <p className="text-xs text-ink-muted">
              Reported by {r.reporter?.name} on project "{r.project?.title}"
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={r.status === 'pending' ? 'ember' : 'success'}>{r.status}</Badge>
            {r.status === 'pending' && (
              <>
                <Button size="sm" variant="secondary" onClick={() => onResolve(r._id, 'dismissed')}>Dismiss</Button>
                <Button size="sm" onClick={() => onResolve(r._id, 'reviewed')}>Resolve</Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
