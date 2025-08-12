import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SpendingTrendChart from "@/components/charts/spending-trend-chart";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function Expenses() {
  const [expenses] = useState([
    {
      id: 1,
      date: "Dec 15, 2023",
      description: "Grocery Shopping",
      category: "Food",
      amount: 45.99,
    },
    {
      id: 2,
      date: "Dec 14, 2023", 
      description: "Gas Station",
      category: "Transport",
      amount: 32.50,
    },
    {
      id: 3,
      date: "Dec 13, 2023",
      description: "Netflix Subscription",
      category: "Entertainment",
      amount: 15.99,
    },
    {
      id: 4,
      date: "Dec 12, 2023",
      description: "Coffee Shop",
      category: "Food",
      amount: 8.75,
    },
  ]);

  const budget = {
    total: 2000,
    spent: 1234,
    remaining: 766,
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: "bg-secondary/10 text-secondary",
      Transport: "bg-accent/10 text-accent",
      Entertainment: "bg-purple-100 text-purple-700",
      Shopping: "bg-blue-100 text-blue-700",
      Bills: "bg-red-100 text-red-700",
    };
    return colors[category] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">
          Expense Tracker
        </h2>
        <Button 
          className="mt-4 sm:mt-0"
          data-testid="button-add-expense"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Monthly Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-muted-foreground">Total Budget</span>
                <span className="font-semibold" data-testid="text-total-budget">
                  ${budget.total}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-muted-foreground">Spent</span>
                <span className="font-semibold text-error" data-testid="text-spent">
                  ${budget.spent}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-muted-foreground">Remaining</span>
                <span className="font-semibold text-success" data-testid="text-remaining">
                  ${budget.remaining}
                </span>
              </div>
              <Progress 
                value={(budget.spent / budget.total) * 100} 
                className="h-3"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 chart-container">
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingTrendChart />
          </CardContent>
        </Card>
      </div>

      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-card divide-y divide-slate-200 dark:divide-slate-700">
                {expenses.map((expense) => (
                  <tr key={expense.id} data-testid={`expense-row-${expense.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-foreground">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-foreground">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-foreground">
                      ${expense.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary/80 mr-3"
                        data-testid={`button-edit-expense-${expense.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-error hover:text-error/80"
                        data-testid={`button-delete-expense-${expense.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
