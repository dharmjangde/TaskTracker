import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Wallet, 
  Book, 
  CheckSquare, 
  BarChart3, 
  Flame,
  Plus,
  Play,
  Receipt,
  TrendingUp
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddTask: () => void;
  onOpenAddExpense: () => void;
}

export default function Sidebar({ isOpen, onClose, onOpenAddTask, onOpenAddExpense }: SidebarProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/expenses", label: "Expenses", icon: Wallet },
    { href: "/study", label: "Study Tracker", icon: Book },
    { href: "/tasks", label: "Task Manager", icon: CheckSquare },
    { href: "/reports", label: "Reports", icon: BarChart3 },
  ];

  const handleStartStudy = () => {
    // TODO: Implement study session start
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "bg-white dark:bg-card shadow-lg w-64 min-h-screen fixed left-0 top-0 z-30 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-slate-200 dark:border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800 dark:text-foreground">
                ProductivityHub
              </h1>
              <p className="text-sm text-slate-600 dark:text-muted-foreground">
                John Doe
              </p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || (location === "/" && item.href === "/dashboard");
              
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a 
                      className={cn(
                        "nav-item",
                        isActive && "active"
                      )}
                      onClick={onClose}
                      data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="h-4 w-4 text-accent" />
              <span className="font-medium">Current Streak</span>
            </div>
            <p className="text-2xl font-bold">7 days</p>
            <p className="text-sm opacity-90">Keep it up!</p>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-medium text-slate-600 dark:text-muted-foreground px-4">
              Quick Actions
            </h3>
            <button 
              className="w-full btn-primary flex items-center space-x-3"
              onClick={onOpenAddTask}
              data-testid="button-add-task"
            >
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
            <button 
              className="w-full btn-secondary flex items-center space-x-3"
              onClick={handleStartStudy}
              data-testid="button-start-study"
            >
              <Play className="h-4 w-4" />
              <span>Start Study</span>
            </button>
            <button 
              className="w-full btn-accent flex items-center space-x-3"
              onClick={onOpenAddExpense}
              data-testid="button-add-expense"
            >
              <Receipt className="h-4 w-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
