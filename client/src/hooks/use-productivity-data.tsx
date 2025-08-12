import { useState, useEffect } from "react";

interface ProductivityData {
  tasks: {
    completed: number;
    total: number;
    completionRate: number;
  };
  study: {
    hoursToday: number;
    targetHours: number;
    streak: number;
  };
  expenses: {
    monthlyTotal: number;
    budget: number;
    categories: Array<{
      name: string;
      amount: number;
      percentage: number;
    }>;
  };
  productivity: {
    score: number;
    trend: number;
  };
}

export function useProductivityData() {
  const [data, setData] = useState<ProductivityData>({
    tasks: {
      completed: 8,
      total: 12,
      completionRate: 67,
    },
    study: {
      hoursToday: 4.5,
      targetHours: 6,
      streak: 7,
    },
    expenses: {
      monthlyTotal: 1234,
      budget: 2000,
      categories: [
        { name: "Food", amount: 400, percentage: 32 },
        { name: "Transport", amount: 200, percentage: 16 },
        { name: "Entertainment", amount: 150, percentage: 12 },
        { name: "Shopping", amount: 300, percentage: 24 },
        { name: "Bills", amount: 184, percentage: 16 },
      ],
    },
    productivity: {
      score: 87,
      trend: 5,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // TODO: Implement API call to Google Sheets
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    data,
    isLoading,
    refreshData,
  };
}
