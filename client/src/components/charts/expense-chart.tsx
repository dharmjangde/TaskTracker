import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Food', value: 400, color: '#EF4444', percentage: 32 },
  { name: 'Transport', value: 200, color: '#F59E0B', percentage: 16 },
  { name: 'Entertainment', value: 150, color: '#10B981', percentage: 12 },
  { name: 'Shopping', value: 300, color: '#8B5CF6', percentage: 24 },
  { name: 'Bills', value: 184, color: '#06B6D4', percentage: 16 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-800 dark:text-slate-200">{data.name}</p>
        <p className="text-slate-600 dark:text-slate-400">
          Amount: ${data.value}
        </p>
        <p className="text-slate-500 text-sm">
          {data.percentage}% of total
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-600 dark:text-slate-400">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
