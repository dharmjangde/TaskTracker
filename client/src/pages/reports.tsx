import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskCompletionChart from "@/components/charts/task-completion-chart";
import ProductivityTrendsChart from "@/components/charts/productivity-trends-chart";
import { Download } from "lucide-react";

export default function Reports() {
  const [period, setPeriod] = useState("7days");

  const handleExportReport = () => {
    // TODO: Implement report export
    console.log("Exporting report...");
  };

  const studyDistribution = [
    { name: "Morning", value: 30, color: "#06b6d4" },
    { name: "Afternoon", value: 25, color: "#10b981" },
    { name: "Evening", value: 35, color: "#f59e0b" },
    { name: "Night", value: 10, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">
          Progress Reports
        </h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]" data-testid="select-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleExportReport}
            data-testid="button-export"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Task Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCompletionChart />
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Study Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-muted-foreground">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Productivity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductivityTrendsChart />
        </CardContent>
      </Card>
    </div>
  );
}
