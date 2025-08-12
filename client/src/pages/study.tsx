import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Code, Database } from "lucide-react";

export default function Study() {
  const [isStudying, setIsStudying] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    subject: "",
    elapsed: 0,
    target: 360, // 6 hours in minutes
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

  const handleStartStudy = (subject?: string) => {
    setIsStudying(true);
    setCurrentSession(prev => ({
      ...prev,
      subject: subject || "General Study",
    }));
  };

  const handlePauseStudy = () => {
    setIsStudying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">
          Study Tracker
        </h2>
        <Button 
          className="mt-4 sm:mt-0 btn-secondary"
          onClick={() => handleStartStudy()}
          data-testid="button-start-session"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Session
        </Button>
      </div>

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
