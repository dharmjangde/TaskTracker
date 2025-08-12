import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const data = [
  { week: 'Week 1', amount: 320, budget: 400, status: 'good' },
  { week: 'Week 2', amount: 280, budget: 400, status: 'good' },
  { week: 'Week 3', amount: 410, budget: 400, status: 'over' },
  { week: 'Week 4', amount: 234, budget: 400, status: 'good' },
];

const getBarColor = (status: string) => {
  switch (status) {
    case 'good': return '#10B981'; // Green
    case 'warning': return '#F59E0B'; // Yellow
    case 'over': return '#EF4444'; // Red
    default: return '#10B981';
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-800 dark:text-slate-200">{label}</p>
        <p className="text-slate-600 dark:text-slate-400">
          Spent: ${data.amount}
        </p>
        <p className="text-slate-500 text-sm">
          Budget: ${data.budget}
        </p>
        <p className={`text-sm font-medium ${
          data.status === 'good' ? 'text-green-600' : 
          data.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {data.status === 'good' ? 'Within Budget' : 
           data.status === 'warning' ? 'Near Limit' : 'Over Budget'}
        </p>
      </div>
    );
  }
  return null;
};

export default function SpendingTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.6}/>
          </linearGradient>
          <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.3} />
        <XAxis 
          dataKey="week" 
          fontSize={12}
          stroke="#64748B"
          tick={{ fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <YAxis 
          fontSize={12}
          stroke="#64748B"
          tick={{ fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="amount" 
          radius={[6, 6, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.status === 'good' ? 'url(#greenGradient)' : 
                    entry.status === 'warning' ? 'url(#yellowGradient)' : 'url(#redGradient)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
