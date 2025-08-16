import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MoreHorizontal, 
  Clock, 
  CheckCircle, 
  Wand2, 
  Play, 
  Pause, 
  X,
  Calendar,
  BarChart3,
  Edit,
  Trash2
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  category: "Study" | "Exercise" | "Meals" | "Work" | "Personal" | "Entertainment";
  priority: "Low" | "Medium" | "High";
  estimatedTime: string;
  scheduledTime: string;
  status: "todo" | "progress" | "done" | "skipped";
  completedAt?: string;
  date: string;
}

interface DailyRecord {
  date: string;
  completed: number;
  pending: number;
  skipped: number;
  total: number;
}

export default function DailyRoutineTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Morning Study Session",
      description: "Review React Hooks and JavaScript concepts",
      category: "Study",
      priority: "High",
      estimatedTime: "2h",
      scheduledTime: "08:00",
      status: "todo",
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 2,
      title: "Breakfast",
      description: "Healthy breakfast with fruits and protein",
      category: "Meals",
      priority: "Medium",
      estimatedTime: "30min",
      scheduledTime: "07:00",
      status: "done",
      completedAt: "Completed at 07:15",
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 3,
      title: "Exercise/Workout",
      description: "30-minute cardio and strength training",
      category: "Exercise",
      priority: "High",
      estimatedTime: "45min",
      scheduledTime: "06:00",
      status: "progress",
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 4,
      title: "Lunch Break",
      description: "Nutritious lunch and short rest",
      category: "Meals",
      priority: "Medium",
      estimatedTime: "45min",
      scheduledTime: "12:00",
      status: "todo",
      date: new Date().toISOString().split('T')[0],
    },
  ]);

  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Study" as Task['category'],
    priority: "Medium" as Task['priority'],
    estimatedTime: "",
    scheduledTime: "",
  });

  // Calculate daily records
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => task.date === today);
    
    const record: DailyRecord = {
      date: today,
      completed: todayTasks.filter(task => task.status === "done").length,
      pending: todayTasks.filter(task => task.status === "todo" || task.status === "progress").length,
      skipped: todayTasks.filter(task => task.status === "skipped").length,
      total: todayTasks.length,
    };

    setDailyRecords(prev => {
      const filtered = prev.filter(r => r.date !== today);
      return [...filtered, record];
    });
  }, [tasks]);

  const todayTasks = tasks.filter(task => task.date === selectedDate);

  const tasksByStatus = {
    todo: todayTasks.filter(task => task.status === "todo"),
    progress: todayTasks.filter(task => task.status === "progress"),
    done: todayTasks.filter(task => task.status === "done"),
    skipped: todayTasks.filter(task => task.status === "skipped"),
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      High: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
      Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300", 
      Low: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    };
    return colors[priority as keyof typeof colors] || colors.Low;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Study: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
      Exercise: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
      Meals: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
      Work: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
      Personal: "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300",
      Entertainment: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300",
    };
    return colors[category as keyof typeof colors] || colors.Personal;
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
        dotColor: "bg-blue-500",
        badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
      },
      done: {
        title: "Completed",
        color: "bg-green-50 dark:bg-green-950/20", 
        dotColor: "bg-green-500",
        badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
      },
      skipped: {
        title: "Skipped",
        color: "bg-red-50 dark:bg-red-950/20", 
        dotColor: "bg-red-500",
        badgeColor: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
      },
    };
    return configs[status as keyof typeof configs] || configs.todo;
  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === "done" ? `Completed at ${new Date().toLocaleTimeString()}` : undefined,
        };
      }
      return task;
    }));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now(),
      ...newTask,
      status: "todo",
      date: selectedDate,
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      category: "Study",
      priority: "Medium",
      estimatedTime: "",
      scheduledTime: "",
    });
    setShowAddTask(false);
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const generateDailyTasks = () => {
    const routineTasks = [
      {
        title: "Morning Exercise",
        description: "30-minute workout to start the day",
        category: "Exercise" as const,
        priority: "High" as const,
        estimatedTime: "30min",
        scheduledTime: "06:00",
      },
      {
        title: "Breakfast",
        description: "Healthy breakfast with protein and fruits",
        category: "Meals" as const,
        priority: "Medium" as const,
        estimatedTime: "30min",
        scheduledTime: "07:00",
      },
      {
        title: "Study Session 1",
        description: "Focus on main subjects and practice problems",
        category: "Study" as const,
        priority: "High" as const,
        estimatedTime: "2h",
        scheduledTime: "08:00",
      },
      {
        title: "Mid-morning Snack",
        description: "Light snack and hydration break",
        category: "Meals" as const,
        priority: "Low" as const,
        estimatedTime: "15min",
        scheduledTime: "10:00",
      },
      {
        title: "Study Session 2",
        description: "Continue with assignments and review",
        category: "Study" as const,
        priority: "High" as const,
        estimatedTime: "2h",
        scheduledTime: "10:30",
      },
      {
        title: "Lunch Break",
        description: "Nutritious lunch and rest",
        category: "Meals" as const,
        priority: "Medium" as const,
        estimatedTime: "1h",
        scheduledTime: "12:30",
      },
      {
        title: "Recreation Time",
        description: "Games, music, or entertainment",
        category: "Entertainment" as const,
        priority: "Medium" as const,
        estimatedTime: "1h",
        scheduledTime: "14:00",
      },
      {
        title: "Evening Study",
        description: "Review and practice what was learned",
        category: "Study" as const,
        priority: "Medium" as const,
        estimatedTime: "1.5h",
        scheduledTime: "16:00",
      },
      {
        title: "Dinner",
        description: "Healthy dinner with family",
        category: "Meals" as const,
        priority: "Medium" as const,
        estimatedTime: "45min",
        scheduledTime: "19:00",
      },
      {
        title: "Evening Walk",
        description: "Light exercise and fresh air",
        category: "Exercise" as const,
        priority: "Low" as const,
        estimatedTime: "30min",
        scheduledTime: "20:00",
      },
    ];

    const newTasks = routineTasks.map(task => ({
      id: Date.now() + Math.random(),
      ...task,
      status: "todo" as const,
      date: selectedDate,
    }));

    setTasks(prev => [...prev.filter(t => t.date !== selectedDate), ...newTasks]);
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-foreground">
            Daily Routine Manager
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your daily schedule and track progress
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
          />
          <Button 
            variant="outline"
            onClick={() => setShowRecords(!showRecords)}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Records
          </Button>
          <Button 
            variant="outline"
            onClick={generateDailyTasks}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Routine
          </Button>
          <Button onClick={() => setShowAddTask(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{tasksByStatus.done.length}</div>
          <div className="text-sm text-slate-600">Completed</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{tasksByStatus.progress.length}</div>
          <div className="text-sm text-slate-600">In Progress</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-slate-600">{tasksByStatus.todo.length}</div>
          <div className="text-sm text-slate-600">Pending</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{tasksByStatus.skipped.length}</div>
          <div className="text-sm text-slate-600">Skipped</div>
        </Card>
      </div>

      {/* Records Modal */}
      {showRecords && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Daily Records</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowRecords(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {dailyRecords.map((record) => (
              <div key={record.date} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span>{record.date}</span>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-600">✓ {record.completed}</span>
                  <span className="text-slate-600">⏳ {record.pending}</span>
                  <span className="text-red-600">✗ {record.skipped}</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Total: {record.total}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add Task Modal */}
      {showAddTask && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Task</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowAddTask(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({...prev, title: e.target.value}))}
              className="px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({...prev, description: e.target.value}))}
              className="px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
            />
            <select
              value={newTask.category}
              onChange={(e) => setNewTask(prev => ({...prev, category: e.target.value as Task['category']}))}
              className="px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
            >
              <option value="Study">Study</option>
              <option value="Exercise">Exercise</option>
              <option value="Meals">Meals</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask(prev => ({...prev, priority: e.target.value as Task['priority']}))}
              className="px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <input
              type="text"
              placeholder="Estimated time (e.g., 2h, 30min)"
              value={newTask.estimatedTime}
              onChange={(e) => setNewTask(prev => ({...prev, estimatedTime: e.target.value}))}
              className="px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
            />
            <input
              type="time"
              value={newTask.scheduledTime}
              onChange={(e) => setNewTask(prev => ({...prev, scheduledTime: e.target.value}))}
              className="px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowAddTask(false)}>Cancel</Button>
            <Button onClick={addTask}>Add Task</Button>
          </div>
        </Card>
      )}

      {/* Task Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => {
          const config = getStatusConfig(status);
          
          return (
            <div key={status} className={`${config.color} rounded-xl p-4 min-h-[300px]`}>
              <h3 className="font-semibold text-slate-800 dark:text-foreground mb-4 flex items-center">
                <div className={`w-3 h-3 ${config.dotColor} rounded-full mr-2`} />
                {config.title}
                <span className={`ml-auto ${config.badgeColor} px-2 py-1 rounded-full text-xs`}>
                  {statusTasks.length}
                </span>
              </h3>
              
              <div className="space-y-3">
                {statusTasks
                  .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
                  .map((task) => (
                  <Card key={task.id} className="shadow-sm border border-slate-200 dark:border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-medium text-slate-800 dark:text-foreground ${
                          task.status === "done" ? "line-through" : ""
                        }`}>
                          {task.title}
                        </h4>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                            className="text-red-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {task.description}
                      </p>

                      <div className="flex gap-1 mb-3">
                        <Badge className={`text-xs ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {task.scheduledTime} ({task.estimatedTime})
                        </span>
                      </div>

                      {task.completedAt && (
                        <p className="text-xs text-green-600 mb-2">{task.completedAt}</p>
                      )}
                      
                      <div className="flex gap-2">
                        {task.status === "todo" && (
                          <>
                            <Button 
                              size="sm" 
                              className="flex-1 text-xs"
                              onClick={() => updateTaskStatus(task.id, "progress")}
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1 text-xs"
                              onClick={() => updateTaskStatus(task.id, "skipped")}
                            >
                              Skip
                            </Button>
                          </>
                        )}
                        {task.status === "progress" && (
                          <>
                            <Button 
                              size="sm" 
                              className="flex-1 text-xs bg-green-600 hover:bg-green-700"
                              onClick={() => updateTaskStatus(task.id, "done")}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Done
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1 text-xs"
                              onClick={() => updateTaskStatus(task.id, "todo")}
                            >
                              <Pause className="w-3 h-3 mr-1" />
                              Pause
                            </Button>
                          </>
                        )}
                        {(task.status === "done" || task.status === "skipped") && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={() => updateTaskStatus(task.id, "todo")}
                          >
                            Reset
                          </Button>
                        )}
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