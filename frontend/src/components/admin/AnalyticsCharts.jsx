import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '../ui/Card';

export default function AnalyticsCharts({ topCategories = [], signupsByMonth = [] }) {
  const categoryData = topCategories.map((c) => ({ name: c._id, count: c.count }));
  const signupData = signupsByMonth.map((s) => ({ name: `${s._id.month}/${s._id.year}`, count: s.count }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card hover={false}>
        <h3 className="mb-4 font-display text-ink">Top project categories</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)' }} />
            <Bar dataKey="count" fill="#FF7A30" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card hover={false}>
        <h3 className="mb-4 font-display text-ink">Signups per month</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={signupData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)' }} />
            <Bar dataKey="count" fill="#3E5C76" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
