import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Clock, CheckCircle, Wand2 } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  estimatedTime: string;
  status: "todo" | "progress" | "done";
  completedAt?: string;
}

export default function Tasks() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review React Hooks",
      description: "Deep dive into useEffect and useContext",
      priority: "High",
      estimatedTime: "2h",
      status: "todo",
    },
    {
      id: 2,
      title: "Update Portfolio", 
      description: "Add new projects and update skills",
      priority: "Medium",
      estimatedTime: "3h",
      status: "todo",
    },
    {
      id: 3,
      title: "Build Todo App",
      description: "React + Vite frontend application",
      priority: "High",
      estimatedTime: "5h",
      status: "progress",
    },
    {
      id: 4,
      title: "Study JavaScript Basics",
      description: "Variables, functions, and objects",
      priority: "Low",
      estimatedTime: "2h",
      status: "done",
      completedAt: "Completed today",
    },
  ]);

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === "todo"),
    progress: tasks.filter(task => task.status === "progress"),
    done: tasks.filter(task => task.status === "done"),
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      High: "bg-error/10 text-error",
      Medium: "bg-secondary/10 text-secondary", 
      Low: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    };
    return colors[priority as keyof typeof colors] || colors.Low;
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      todo: {
        title: "To Do",
        color: "bg-slate-100 dark:bg-slate-800",
        dotColor: "bg-slate-400",
        badgeColor: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
      },
      progress: {
        title: "In Progress", 
        color: "bg-blue-50 dark:bg-blue-950/20",
        dotColor: "bg-primary",
        badgeColor: "bg-primary/10 text-primary",
      },
      done: {
        title: "Done",
        color: "bg-green-50 dark:bg-green-950/20", 
        dotColor: "bg-success",
        badgeColor: "bg-success/10 text-success",
      },
    };
    return configs[status as keyof typeof configs] || configs.todo;
  };

  const generateDailyTasks = () => {
    // TODO: Implement daily task generation
    console.log("Generating daily tasks...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">
          Task Manager
        </h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button 
            variant="outline"
            className="btn-secondary"
            onClick={generateDailyTasks}
            data-testid="button-generate-tasks"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Daily Tasks
          </Button>
          <Button data-testid="button-add-task">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => {
          const config = getStatusConfig(status);
          
          return (
            <div key={status} className={`${config.color} rounded-xl p-4`}>
              <h3 className="font-semibold text-slate-800 dark:text-foreground mb-4 flex items-center">
                <div className={`w-3 h-3 ${config.dotColor} rounded-full mr-2`} />
                {config.title}
                <span className={`ml-auto ${config.badgeColor} px-2 py-1 rounded-full text-xs`}>
                  {statusTasks.length}
                </span>
              </h3>
              
              <div className="space-y-3">
                {statusTasks.map((task) => (
                  <Card key={task.id} className="shadow-sm border border-slate-200 dark:border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-medium text-slate-800 dark:text-foreground ${
                          task.status === "done" ? "line-through" : ""
                        }`}>
                          {task.title}
                        </h4>
                        {task.status === "done" ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                            data-testid={`button-task-menu-${task.id}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-muted-foreground mb-3">
                        {task.description}
                      </p>
                      
                      {task.status === "progress" && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-slate-600 dark:text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>65%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {task.status === "done" ? task.completedAt : `${task.estimatedTime} estimated`}
                        </span>
                        <Badge 
                          className={`text-xs ${getPriorityColor(task.priority)}`}
                          data-testid={`badge-priority-${task.id}`}
                        >
                          {task.status === "done" ? "Completed" : 
                           task.status === "progress" ? "Due Today" : 
                           `${task.priority} Priority`}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
