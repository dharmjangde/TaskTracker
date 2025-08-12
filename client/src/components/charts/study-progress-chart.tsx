import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 4.5 },
];

export default function StudyProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="day" 
          fontSize={12}
          className="text-slate-600 dark:text-slate-400"
        />
        <YAxis 
          fontSize={12}
          className="text-slate-600 dark:text-slate-400"
        />
        <Line 
          type="monotone" 
          dataKey="hours" 
          stroke="hsl(var(--secondary))" 
          strokeWidth={2}
          dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--secondary))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
