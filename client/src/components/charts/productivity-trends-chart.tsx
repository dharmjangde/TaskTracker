import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Tooltip, ReferenceLine } from 'recharts';

const data = [
  { month: 'Jan', score: 75, target: 80, status: 'warning' },
  { month: 'Feb', score: 82, target: 80, status: 'good' },
  { month: 'Mar', score: 78, target: 80, status: 'warning' },
  { month: 'Apr', score: 85, target: 80, status: 'good' },
  { month: 'May', score: 87, target: 80, status: 'good' },
  { month: 'Jun', score: 90, target: 80, status: 'excellent' },
];

const getScoreColor = (score: number) => {
  if (score >= 85) return '#10B981'; // Green - Excellent
  if (score >= 75) return '#F59E0B'; // Yellow - Good
  return '#EF4444'; // Red - Needs improvement
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-slate-600 dark:text-slate-400">
            Productivity Score: <span className="font-semibold">{data.score}%</span>
          </p>
          <p className="text-slate-500 text-sm">
            Target: {data.target}%
          </p>
          <p className={`text-sm font-medium ${
            data.score >= 85 ? 'text-green-600' : 
            data.score >= 75 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {data.score >= 85 ? 'Excellent Performance' : 
             data.score >= 75 ? 'Good Performance' : 'Needs Improvement'}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const color = getScoreColor(payload.score);
  
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={6} 
      fill={color}
      stroke="#fff"
      strokeWidth={3}
      className="drop-shadow-sm"
    />
  );
};

export default function ProductivityTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.3} />
        <XAxis 
          dataKey="month" 
          fontSize={12}
          stroke="#64748B"
          tick={{ fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <YAxis 
          domain={[60, 100]}
          fontSize={12}
          stroke="#64748B"
          tick={{ fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine 
          y={80} 
          stroke="#F59E0B" 
          strokeDasharray="5 5" 
          strokeWidth={2}
          label={{ value: "Target", position: "right" }}
        />
        <Area 
          type="monotone" 
          dataKey="score" 
          stroke="#3B82F6" 
          strokeWidth={4}
          fill="url(#productivityGradient)"
          dot={<CustomDot />}
          activeDot={{ r: 8, fill: "#3B82F6", stroke: "#fff", strokeWidth: 3 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
