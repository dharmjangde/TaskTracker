import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const data = [
  { 
    day: 'Mon', 
    tasks: 8, 
    study: 3, 
    expenses: 45,
    productivity: 85,
    status: 'excellent'
  },
  { 
    day: 'Tue', 
    tasks: 6, 
    study: 2.5, 
    expenses: 67,
    productivity: 78,
    status: 'good'
  },
  { 
    day: 'Wed', 
    tasks: 5, 
    study: 4, 
    expenses: 23,
    productivity: 92,
    status: 'excellent'
  },
  { 
    day: 'Thu', 
    tasks: 7, 
    study: 3.5, 
    expenses: 89,
    productivity: 80,
    status: 'good'
  },
  { 
    day: 'Fri', 
    tasks: 9, 
    study: 2, 
    expenses: 124,
    productivity: 75,
    status: 'warning'
  },
  { 
    day: 'Sat', 
    tasks: 4, 
    study: 5, 
    expenses: 156,
    productivity: 88,
    status: 'excellent'
  },
  { 
    day: 'Sun', 
    tasks: 3, 
    study: 4.5, 
    expenses: 98,
    productivity: 90,
    status: 'excellent'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return '#10B981'; // Green
    case 'good': return '#F59E0B'; // Yellow
    case 'warning': return '#EF4444'; // Red
    default: return '#10B981';
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">{label}</p>
        <div className="space-y-1 text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            Tasks Completed: <span className="font-semibold text-blue-600">{data.tasks}</span>
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Study Hours: <span className="font-semibold text-green-600">{data.study}h</span>
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Expenses: <span className="font-semibold text-purple-600">${data.expenses}</span>
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Productivity: <span className={`font-semibold ${
              data.productivity >= 85 ? 'text-green-600' : 
              data.productivity >= 75 ? 'text-yellow-600' : 'text-red-600'
            }`}>{data.productivity}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function WeeklyOverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6}/>
          </linearGradient>
          <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.3} />
        <XAxis 
          dataKey="day" 
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
          dataKey="tasks" 
          fill="url(#taskGradient)"
          radius={[4, 4, 0, 0]}
          name="Tasks"
        />
        <Bar 
          dataKey="study" 
          fill="url(#studyGradient)"
          radius={[4, 4, 0, 0]}
          name="Study Hours"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}