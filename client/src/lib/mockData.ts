// Mock data for frontend-only version
export interface User {
  id: string;
  username: string;
  streak: number;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  estimatedTime?: string;
  status: "todo" | "progress" | "done";
  completedAt?: Date;
  createdAt: Date;
}

export interface Expense {
  id: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  subject: string;
  duration: number; // in minutes
  date: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  unlockedAt: Date;
}

// Mock current user
export const mockUser: User = {
  id: "user-1",
  username: "john_doe",
  streak: 7
};

// Mock tasks data
export const mockTasks: Task[] = [
  {
    id: "task-1",
    userId: "user-1",
    title: "Complete React project",
    description: "Finish the productivity dashboard application",
    priority: "high",
    estimatedTime: "4 hours",
    status: "progress",
    createdAt: new Date("2024-01-15T09:00:00Z")
  },
  {
    id: "task-2",
    userId: "user-1",
    title: "Study JavaScript ES6",
    description: "Review arrow functions, destructuring, and modules",
    priority: "medium",
    estimatedTime: "2 hours",
    status: "done",
    completedAt: new Date("2024-01-15T11:30:00Z"),
    createdAt: new Date("2024-01-15T08:00:00Z")
  },
  {
    id: "task-3",
    userId: "user-1",
    title: "Read programming book",
    description: "Continue reading Clean Code by Robert Martin",
    priority: "low",
    estimatedTime: "1 hour",
    status: "todo",
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
  {
    id: "task-4",
    userId: "user-1",
    title: "Review TypeScript concepts",
    description: "Go through interfaces and generics",
    priority: "medium",
    estimatedTime: "3 hours",
    status: "todo",
    createdAt: new Date("2024-01-15T12:00:00Z")
  },
  {
    id: "task-5",
    userId: "user-1",
    title: "Plan weekly goals",
    description: "Set priorities and objectives for next week",
    priority: "high",
    estimatedTime: "1 hour",
    status: "progress",
    createdAt: new Date("2024-01-15T14:00:00Z")
  }
];

// Mock expenses data
export const mockExpenses: Expense[] = [
  {
    id: "expense-1",
    userId: "user-1",
    description: "Coffee and snacks",
    amount: 15.50,
    category: "Food",
    date: new Date("2024-01-15T09:30:00Z")
  },
  {
    id: "expense-2",
    userId: "user-1",
    description: "Programming course subscription",
    amount: 29.99,
    category: "Education",
    date: new Date("2024-01-14T10:00:00Z")
  },
  {
    id: "expense-3",
    userId: "user-1",
    description: "Lunch",
    amount: 12.75,
    category: "Food",
    date: new Date("2024-01-14T13:15:00Z")
  },
  {
    id: "expense-4",
    userId: "user-1",
    description: "Transportation",
    amount: 8.50,
    category: "Transport",
    date: new Date("2024-01-13T08:45:00Z")
  },
  {
    id: "expense-5",
    userId: "user-1",
    description: "Software license",
    amount: 99.99,
    category: "Tools",
    date: new Date("2024-01-12T16:20:00Z")
  }
];

// Mock study sessions data
export const mockStudySessions: StudySession[] = [
  {
    id: "study-1",
    userId: "user-1",
    subject: "React",
    duration: 120,
    date: new Date("2024-01-15T09:00:00Z")
  },
  {
    id: "study-2",
    userId: "user-1",
    subject: "JavaScript",
    duration: 90,
    date: new Date("2024-01-14T14:00:00Z")
  },
  {
    id: "study-3",
    userId: "user-1",
    subject: "TypeScript",
    duration: 75,
    date: new Date("2024-01-14T10:30:00Z")
  },
  {
    id: "study-4",
    userId: "user-1",
    subject: "CSS",
    duration: 60,
    date: new Date("2024-01-13T15:45:00Z")
  },
  {
    id: "study-5",
    userId: "user-1",
    subject: "Node.js",
    duration: 105,
    date: new Date("2024-01-12T11:00:00Z")
  }
];

// Mock achievements data
export const mockAchievements: Achievement[] = [
  {
    id: "achievement-1",
    userId: "user-1",
    type: "streak",
    title: "Week Warrior",
    description: "Maintained a 7-day productivity streak",
    unlockedAt: new Date("2024-01-15T18:00:00Z")
  },
  {
    id: "achievement-2",
    userId: "user-1",
    type: "tasks",
    title: "Task Master",
    description: "Completed 50 tasks",
    unlockedAt: new Date("2024-01-10T12:00:00Z")
  },
  {
    id: "achievement-3",
    userId: "user-1",
    type: "study",
    title: "Study Champion",
    description: "Studied for 10 hours in one week",
    unlockedAt: new Date("2024-01-08T16:30:00Z")
  }
];

// Helper functions to simulate API calls with promises
export const mockApi = {
  // User methods
  getUser: (): Promise<User> => 
    new Promise(resolve => setTimeout(() => resolve(mockUser), 100)),

  // Task methods
  getTasks: (): Promise<Task[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockTasks), 100)),
  
  createTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt'>): Promise<Task> => 
    new Promise(resolve => {
      const newTask: Task = {
        ...task,
        id: `task-${Date.now()}`,
        userId: mockUser.id,
        createdAt: new Date()
      };
      mockTasks.push(newTask);
      setTimeout(() => resolve(newTask), 100);
    }),

  updateTask: (id: string, updates: Partial<Task>): Promise<Task> => 
    new Promise(resolve => {
      const taskIndex = mockTasks.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates };
        setTimeout(() => resolve(mockTasks[taskIndex]), 100);
      }
    }),

  deleteTask: (id: string): Promise<void> => 
    new Promise(resolve => {
      const taskIndex = mockTasks.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        mockTasks.splice(taskIndex, 1);
      }
      setTimeout(() => resolve(), 100);
    }),

  // Expense methods
  getExpenses: (): Promise<Expense[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockExpenses), 100)),
  
  createExpense: (expense: Omit<Expense, 'id' | 'userId' | 'date'>): Promise<Expense> => 
    new Promise(resolve => {
      const newExpense: Expense = {
        ...expense,
        id: `expense-${Date.now()}`,
        userId: mockUser.id,
        date: new Date()
      };
      mockExpenses.push(newExpense);
      setTimeout(() => resolve(newExpense), 100);
    }),

  deleteExpense: (id: string): Promise<void> => 
    new Promise(resolve => {
      const expenseIndex = mockExpenses.findIndex(e => e.id === id);
      if (expenseIndex !== -1) {
        mockExpenses.splice(expenseIndex, 1);
      }
      setTimeout(() => resolve(), 100);
    }),

  // Study session methods
  getStudySessions: (): Promise<StudySession[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockStudySessions), 100)),
  
  createStudySession: (session: Omit<StudySession, 'id' | 'userId' | 'date'>): Promise<StudySession> => 
    new Promise(resolve => {
      const newSession: StudySession = {
        ...session,
        id: `study-${Date.now()}`,
        userId: mockUser.id,
        date: new Date()
      };
      mockStudySessions.push(newSession);
      setTimeout(() => resolve(newSession), 100);
    }),

  // Achievement methods
  getAchievements: (): Promise<Achievement[]> => 
    new Promise(resolve => setTimeout(() => resolve(mockAchievements), 100))
};