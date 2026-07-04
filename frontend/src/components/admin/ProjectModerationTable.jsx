import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ProjectModerationTable({ projects = [], onFeature, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-ink-muted">
            <th className="py-3 pr-4">Title</th>
            <th className="py-3 pr-4">Owner</th>
            <th className="py-3 pr-4">Category</th>
            <th className="py-3 pr-4">Featured</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id} className="border-b border-border">
              <td className="py-3 pr-4 text-ink">{p.title}</td>
              <td className="py-3 pr-4 text-ink-muted">{p.owner?.name}</td>
              <td className="py-3 pr-4"><Badge tone="steel">{p.category}</Badge></td>
              <td className="py-3 pr-4">{p.isFeatured ? <Badge tone="ember">Featured</Badge> : '—'}</td>
              <td className="flex gap-2 py-3">
                <Button size="sm" variant="secondary" onClick={() => onFeature(p._id)}>
                  {p.isFeatured ? 'Unfeature' : 'Feature'}
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(p._id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
