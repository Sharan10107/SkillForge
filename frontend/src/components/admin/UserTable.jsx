import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function UserTable({ users = [], onToggleBan }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-ink-muted">
            <th className="py-3 pr-4">User</th>
            <th className="py-3 pr-4">Email</th>
            <th className="py-3 pr-4">Role</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b border-border">
              <td className="flex items-center gap-2 py-3 pr-4">
                <Avatar src={u.avatarUrl} name={u.name} size={28} /> {u.name}
              </td>
              <td className="py-3 pr-4 text-ink-muted">{u.email}</td>
              <td className="py-3 pr-4"><Badge tone="steel">{u.role}</Badge></td>
              <td className="py-3 pr-4">
                <Badge tone={u.isBanned ? 'danger' : 'success'}>{u.isBanned ? 'Banned' : 'Active'}</Badge>
              </td>
              <td className="py-3">
                <Button size="sm" variant={u.isBanned ? 'secondary' : 'danger'} onClick={() => onToggleBan(u._id)}>
                  {u.isBanned ? 'Unban' : 'Ban'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
