import { useLocation } from "wouter";
import { Menu, Bell } from "lucide-react";

interface TopBarProps {
  onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  const [location] = useLocation();

  const getPageTitle = () => {
    const titles: { [key: string]: string } = {
      "/": "Dashboard",
      "/dashboard": "Dashboard",
      "/expenses": "Expense Tracker",
      "/study": "Study Tracker", 
      "/tasks": "Task Manager",
      "/reports": "Progress Reports"
    };
    return titles[location] || "Dashboard";
  };

  return (
    <header className="bg-white dark:bg-card shadow-sm border-b border-slate-200 dark:border-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden text-slate-600 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground"
            onClick={onToggleSidebar}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-foreground">
            {getPageTitle()}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative p-2 text-slate-600 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            data-testid="button-notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
