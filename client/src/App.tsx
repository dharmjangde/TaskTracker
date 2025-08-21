import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/top-bar";
import Dashboard from "@/pages/dashboard";
import Expenses from "@/pages/expenses";
import Study from "@/pages/study";
import Tasks from "@/pages/tasks";
import Reports from "@/pages/reports";
import NotFound from "@/pages/not-found";
import AchievementModal from "@/components/modals/achievement-modal";
import AddTaskModal from "@/components/modals/add-task-modal";
import AddExpenseModal from "@/components/modals/add-expense-modal";
import MotivationPopup from "@/components/modals/motivation-popup";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMotivation } from "@/hooks/use-motivation";

function Router() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [achievementModalOpen, setAchievementModalOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const { showMotivation, closeMotivation, userData } = useMotivation();

  // Show achievement modal after 3 seconds (demo)
  useEffect(() => {
    const timer = setTimeout(() => {
      setAchievementModalOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onOpenAddTask={() => setAddTaskModalOpen(true)}
        onOpenAddExpense={() => setAddExpenseModalOpen(true)}
      />
      
      <main className="flex-1 lg:ml-64">
        <TopBar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="p-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/study" component={Study} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/reports" component={Reports} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>

      <AchievementModal 
        isOpen={achievementModalOpen}
        onClose={() => setAchievementModalOpen(false)}
        achievement={{
          type: "study_streak",
          title: "Study Streak Master!",
          description: "You've completed 7 days of consistent studying!"
        }}
      />

      <AddTaskModal 
        isOpen={addTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
      />

      <AddExpenseModal 
        isOpen={addExpenseModalOpen}
        onClose={() => setAddExpenseModalOpen(false)}
      />

      <MotivationPopup 
        isOpen={showMotivation}
        onClose={closeMotivation}
        userData={userData}
      />
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
