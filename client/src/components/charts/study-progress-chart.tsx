import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', hours: 2, target: 4 },
  { day: 'Tue', hours: 4, target: 4 },
  { day: 'Wed', hours: 3, target: 4 },
  { day: 'Thu', hours: 5, target: 4 },
  { day: 'Fri', hours: 4, target: 4 },
  { day: 'Sat', hours: 6, target: 4 },
  { day: 'Sun', hours: 4.5, target: 4 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-800 dark:text-slate-200">{`${label}`}</p>
        <p className="text-green-600 dark:text-green-400">
          {`Study Hours: ${payload[0].value}h`}
        </p>
        <p className="text-slate-500 text-sm">
          {`Target: ${payload[0].payload.target}h`}
        </p>
      </div>
    );
  }
  return null;
};

export default function StudyProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
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
        <Area 
          type="monotone" 
          dataKey="hours" 
          stroke="#10B981" 
          strokeWidth={3}
          fill="url(#studyGradient)"
          dot={{ fill: "#10B981", strokeWidth: 2, r: 5 }}
          activeDot={{ r: 7, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke="#FCD34D" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
