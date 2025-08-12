import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 1', amount: 320 },
  { week: 'Week 2', amount: 280 },
  { week: 'Week 3', amount: 410 },
  { week: 'Week 4', amount: 234 },
];

export default function SpendingTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="week" 
          fontSize={12}
          className="text-slate-600 dark:text-slate-400"
        />
        <YAxis 
          fontSize={12}
          className="text-slate-600 dark:text-slate-400"
        />
        <Bar 
          dataKey="amount" 
          fill="hsl(var(--accent))" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
