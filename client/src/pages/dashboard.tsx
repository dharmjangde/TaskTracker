import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StudyProgressChart from "@/components/charts/study-progress-chart";
import ExpenseChart from "@/components/charts/expense-chart";
import { 
  CheckSquare, 
  Book, 
  Wallet, 
  TrendingUp,
  ArrowUp,
  CheckCircle,
  Plus,
  DollarSign,
  Trophy
} from "lucide-react";

export default function Dashboard() {
  const stats = {
    todayTasks: { completed: 8, total: 12 },
    studyHours: 4.5,
    studyChange: 1.2,
    expenses: 1234,
    expenseChange: 123,
    productivityScore: 87,
    productivityChange: 5
  };

  const recentActivities = [
    {
      id: 1,
      type: "task",
      icon: CheckCircle,
      title: 'Completed "React Hooks Study"',
      time: "2 hours ago",
      color: "text-secondary"
    },
    {
      id: 2,
      type: "expense",
      icon: DollarSign,
      title: "Added expense: Groceries ($45)",
      time: "4 hours ago",
      color: "text-accent"
    },
    {
      id: 3,
      type: "task",
      icon: Plus,
      title: 'Created task: "Review JavaScript concepts"',
      time: "6 hours ago",
      color: "text-primary"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-muted-foreground text-sm font-medium">
                  Today's Tasks
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-foreground">
                  {stats.todayTasks.completed}/{stats.todayTasks.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Progress 
                value={(stats.todayTasks.completed / stats.todayTasks.total) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-muted-foreground text-sm font-medium">
                  Study Hours
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-foreground">
                  {stats.studyHours}h
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Book className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <p className="text-sm text-secondary mt-2">
              <ArrowUp className="inline w-3 h-3 mr-1" />
              +{stats.studyChange}h from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-muted-foreground text-sm font-medium">
                  Monthly Expenses
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-foreground">
                  ${stats.expenses}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-sm text-error mt-2">
              <ArrowUp className="inline w-3 h-3 mr-1" />
              +${stats.expenseChange} from last month
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-muted-foreground text-sm font-medium">
                  Productivity Score
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-foreground">
                  {stats.productivityScore}%
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-sm text-success mt-2">
              <ArrowUp className="inline w-3 h-3 mr-1" />
              +{stats.productivityChange}% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Weekly Study Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <StudyProgressChart />
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Achievement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 chart-container">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    data-testid={`activity-${activity.id}`}
                  >
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 dark:text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-300" />
                <span className="font-medium">Achievement</span>
              </div>
              <p className="text-sm font-medium">Study Streak Master!</p>
              <p className="text-xs opacity-90">7 days of consistent studying</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
