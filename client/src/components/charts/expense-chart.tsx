import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Food', value: 400, color: 'hsl(var(--secondary))' },
  { name: 'Transport', value: 200, color: 'hsl(var(--accent))' },
  { name: 'Entertainment', value: 150, color: 'hsl(var(--error))' },
  { name: 'Shopping', value: 300, color: 'hsl(var(--chart-4))' },
  { name: 'Bills', value: 184, color: 'hsl(var(--chart-5))' },
];

export default function ExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend 
          verticalAlign="bottom" 
          height={36}
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
