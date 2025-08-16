import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SpendingTrendChart from "@/components/charts/spending-trend-chart";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Expense {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface FormData {
  date: string;
  description: string;
  category: string;
  amount: string;
}

interface Budget {
  total: number;
  spent: number;
  remaining: number;
}

export default function Expenses(): JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([
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

  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    date: "",
    description: "",
    category: "",
    amount: ""
  });

  const budget: Budget = {
    total: 2000,
    spent: 1234,
    remaining: 766,
  };

  const categories: string[] = ["Food", "Transport", "Entertainment", "Shopping", "Bills"];

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      Food: "bg-green-100 text-green-700",
      Transport: "bg-yellow-100 text-yellow-700",
      Entertainment: "bg-purple-100 text-purple-700",
      Shopping: "bg-blue-100 text-blue-700",
      Bills: "bg-red-100 text-red-700",
    };
    return colors[category] || "bg-slate-100 text-slate-700";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!formData.date || !formData.description || !formData.category || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense: Expense = {
      id: expenses.length + 1,
      date: new Date(formData.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
    };

    setExpenses((prev: Expense[]) => [newExpense, ...prev]);
    setFormData({ date: "", description: "", category: "", amount: "" });
    setShowForm(false);
  };

  const handleCancel = (): void => {
    setFormData({ date: "", description: "", category: "", amount: "" });
    setShowForm(false);
  };

  const handleDeleteExpense = (id: number): void => {
    setExpenses((prev: Expense[]) => prev.filter(expense => expense.id !== id));
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
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Add Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground">
                Add New Expense
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter expense description"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                >
                  Add Expense
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                {expenses.map((expense: Expense) => (
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
                        onClick={() => handleDeleteExpense(expense.id)}
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