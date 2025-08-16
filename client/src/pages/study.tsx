import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Code, Database, Plus, Edit, Trash2, X, Clock, BookOpen } from "lucide-react";

interface StudyRoutine {
  id: number;
  subject: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  day: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface RoutineFormData {
  subject: string;
  startTime: string;
  endTime: string;
  day: string;
  icon: string;
  color: string;
  bgColor: string;
}

export default function Study(): JSX.Element {
  const [isStudying, setIsStudying] = useState<boolean>(false);
  const [showRoutineForm, setShowRoutineForm] = useState<boolean>(false);
  const [editingRoutine, setEditingRoutine] = useState<StudyRoutine | null>(null);
  const [currentSession, setCurrentSession] = useState({
    subject: "",
    elapsed: 0,
    target: 360, // 6 hours in minutes
  });

  const [studyRoutines, setStudyRoutines] = useState<StudyRoutine[]>([
    {
      id: 1,
      subject: "JavaScript",
      startTime: "09:00",
      endTime: "11:00",
      duration: 120,
      day: "Monday",
      icon: "Code",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      subject: "Database Design",
      startTime: "14:00",
      endTime: "16:30",
      duration: 150,
      day: "Monday",
      icon: "Database",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      subject: "React",
      startTime: "10:00",
      endTime: "12:00",
      duration: 120,
      day: "Tuesday",
      icon: "Code",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]);

  const [routineFormData, setRoutineFormData] = useState<RoutineFormData>({
    subject: "",
    startTime: "",
    endTime: "",
    day: "",
    icon: "BookOpen",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  });

  const studyData = {
    todayHours: 4.5,
    targetHours: 6,
    subjects: [
      {
        id: 1,
        name: "JavaScript",
        icon: Code,
        todayTime: 2.5,
        color: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        id: 2,
        name: "Database Design", 
        icon: Database,
        todayTime: 1.2,
        color: "text-secondary",
        bgColor: "bg-secondary/10",
      },
    ],
  };

  const weeklyData = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 4 },
    { day: "Sat", hours: 6 },
    { day: "Sun", hours: 4.5 },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const iconOptions = ["BookOpen", "Code", "Database", "Play"];
  const colorOptions = [
    { color: "text-blue-600", bgColor: "bg-blue-100" },
    { color: "text-green-600", bgColor: "bg-green-100" },
    { color: "text-purple-600", bgColor: "bg-purple-100" },
    { color: "text-red-600", bgColor: "bg-red-100" },
    { color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { color: "text-indigo-600", bgColor: "bg-indigo-100" },
  ];

  const calculateDuration = (startTime: string, endTime: string): number => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
  };

  const formatMinutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleStartStudy = (subject?: string): void => {
    setIsStudying(true);
    setCurrentSession(prev => ({
      ...prev,
      subject: subject || "General Study",
    }));
  };

  const handlePauseStudy = (): void => {
    setIsStudying(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setRoutineFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (colorOption: { color: string; bgColor: string }): void => {
    setRoutineFormData(prev => ({
      ...prev,
      color: colorOption.color,
      bgColor: colorOption.bgColor
    }));
  };

  const handleSubmitRoutine = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!routineFormData.subject || !routineFormData.startTime || !routineFormData.endTime || !routineFormData.day) {
      alert("Please fill in all required fields");
      return;
    }

    const duration = calculateDuration(routineFormData.startTime, routineFormData.endTime);
    
    if (duration <= 0) {
      alert("End time must be after start time");
      return;
    }

    if (editingRoutine) {
      // Update existing routine
      setStudyRoutines(prev => prev.map(routine => 
        routine.id === editingRoutine.id 
          ? { ...routineFormData, id: editingRoutine.id, duration }
          : routine
      ));
    } else {
      // Add new routine
      const newRoutine: StudyRoutine = {
        id: studyRoutines.length + 1,
        ...routineFormData,
        duration,
      };
      setStudyRoutines(prev => [...prev, newRoutine]);
    }

    resetForm();
  };

  const resetForm = (): void => {
    setRoutineFormData({
      subject: "",
      startTime: "",
      endTime: "",
      day: "",
      icon: "BookOpen",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    });
    setShowRoutineForm(false);
    setEditingRoutine(null);
  };

  const handleEditRoutine = (routine: StudyRoutine): void => {
    setRoutineFormData({
      subject: routine.subject,
      startTime: routine.startTime,
      endTime: routine.endTime,
      day: routine.day,
      icon: routine.icon,
      color: routine.color,
      bgColor: routine.bgColor,
    });
    setEditingRoutine(routine);
    setShowRoutineForm(true);
  };

  const handleDeleteRoutine = (id: number): void => {
    setStudyRoutines(prev => prev.filter(routine => routine.id !== id));
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      BookOpen,
      Code,
      Database,
      Play,
    };
    return icons[iconName] || BookOpen;
  };

  const getDayRoutines = (day: string): StudyRoutine[] => {
    return studyRoutines.filter(routine => routine.day === day);
  };

  const getTotalDayHours = (day: string): number => {
    const dayRoutines = getDayRoutines(day);
    const totalMinutes = dayRoutines.reduce((total, routine) => total + routine.duration, 0);
    return totalMinutes;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">
          Study Tracker
        </h2>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button 
            className="btn-secondary"
            onClick={() => setShowRoutineForm(true)}
            data-testid="button-add-routine"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Routine
          </Button>
          <Button 
            className="btn-secondary"
            onClick={() => handleStartStudy()}
            data-testid="button-start-session"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>

      {/* Routine Form Modal */}
      {showRoutineForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground">
                {editingRoutine ? "Edit Study Routine" : "Add Study Routine"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmitRoutine} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={routineFormData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter subject name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={routineFormData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={routineFormData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Day *
                </label>
                <select
                  name="day"
                  value={routineFormData.day}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                  required
                >
                  <option value="">Select a day</option>
                  {days.map((day: string) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Icon
                </label>
                <select
                  name="icon"
                  value={routineFormData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-foreground"
                >
                  {iconOptions.map((icon: string) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((colorOption, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleColorChange(colorOption)}
                      className={`w-full h-10 rounded-md border-2 ${colorOption.bgColor} ${
                        routineFormData.color === colorOption.color ? 'border-blue-500' : 'border-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full mx-auto ${colorOption.color.replace('text-', 'bg-')}`}></div>
                    </button>
                  ))}
                </div>
              </div>

              {routineFormData.startTime && routineFormData.endTime && (
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-md">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Duration: {formatMinutesToHours(calculateDuration(routineFormData.startTime, routineFormData.endTime))}
                  </span>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                >
                  {editingRoutine ? "Update Routine" : "Add Routine"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Today's Study Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="rgb(226 232 240)" 
                    strokeWidth="2"
                  />
                  <path 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="rgb(16 185 129)" 
                    strokeWidth="2" 
                    strokeDasharray={`${(studyData.todayHours / studyData.targetHours) * 100}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800 dark:text-foreground">
                      {studyData.todayHours}h
                    </div>
                    <div className="text-sm text-slate-600 dark:text-muted-foreground">
                      of {studyData.targetHours}h goal
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant={isStudying ? "outline" : "default"}
                className={isStudying ? "" : "btn-secondary"}
                onClick={isStudying ? handlePauseStudy : () => handleStartStudy()}
                data-testid="button-toggle-session"
              >
                {isStudying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Session
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Session
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Study Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studyData.subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <div 
                    key={subject.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                    data-testid={`subject-${subject.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${subject.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${subject.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-foreground">
                          {subject.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-muted-foreground">
                          {subject.todayTime}h today
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary hover:text-primary/80"
                      onClick={() => handleStartStudy(subject.name)}
                      data-testid={`button-start-${subject.name.toLowerCase().replace(' ', '-')}`}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Routine Table */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Study Routine Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-card divide-y divide-slate-200 dark:divide-slate-700">
                {studyRoutines.map((routine: StudyRoutine) => {
                  const IconComponent = getIconComponent(routine.icon);
                  return (
                    <tr key={routine.id} data-testid={`routine-row-${routine.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 ${routine.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                            <IconComponent className={`h-4 w-4 ${routine.color}`} />
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-foreground">
                            {routine.subject}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-foreground">
                        {routine.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-foreground">
                        {routine.startTime} - {routine.endTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {formatMinutesToHours(routine.duration)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary/80 mr-3"
                          onClick={() => handleEditRoutine(routine)}
                          data-testid={`button-edit-routine-${routine.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteRoutine(routine.id)}
                          data-testid={`button-delete-routine-${routine.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {studyRoutines.length === 0 && (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-500 dark:text-slate-400">No study routines added yet.</p>
                <p className="text-sm text-slate-400 dark:text-slate-500">Click "Add Routine" to create your first study schedule.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Daily Study Hours Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {days.map((day: string) => {
              const totalMinutes = getTotalDayHours(day);
              const routineCount = getDayRoutines(day).length;
              return (
                <div 
                  key={day} 
                  className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center"
                >
                  <h4 className="font-semibold text-slate-800 dark:text-foreground mb-2">
                    {day.slice(0, 3)}
                  </h4>
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    {formatMinutesToHours(totalMinutes)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {routineCount} {routineCount === 1 ? 'session' : 'sessions'}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-sm font-medium text-slate-600 dark:text-muted-foreground mb-2">
                  {day.day}
                </div>
                <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-end justify-center p-2">
                  <div 
                    className="w-full bg-secondary rounded transition-all duration-300"
                    style={{ height: `${(day.hours / 6) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {day.hours}h
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}