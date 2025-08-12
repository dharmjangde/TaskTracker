export const motivationalQuotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "In the middle of difficulty lies opportunity. - Albert Einstein",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
];

export const achievements = [
  {
    id: "first_task",
    title: "Getting Started!",
    description: "You completed your first task",
    icon: "🎯",
    trigger: "task_completed",
    condition: (count: number) => count === 1,
  },
  {
    id: "study_streak_3",
    title: "Study Streak Beginner",
    description: "3 days of consistent studying",
    icon: "🔥",
    trigger: "study_streak",
    condition: (days: number) => days === 3,
  },
  {
    id: "study_streak_7",
    title: "Study Streak Master",
    description: "7 days of consistent studying",
    icon: "🏆",
    trigger: "study_streak", 
    condition: (days: number) => days === 7,
  },
  {
    id: "budget_saver",
    title: "Budget Saver",
    description: "Stayed under budget this month",
    icon: "💰",
    trigger: "budget_check",
    condition: (percentage: number) => percentage < 90,
  },
  {
    id: "productive_week",
    title: "Productivity Champion",
    description: "Achieved 90%+ productivity this week",
    icon: "⚡",
    trigger: "productivity_check",
    condition: (score: number) => score >= 90,
  },
];

export function getRandomQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

export function checkAchievements(data: any): typeof achievements[0] | null {
  // TODO: Implement achievement checking logic
  // This would check if any new achievements should be unlocked
  // based on the current user data
  
  for (const achievement of achievements) {
    // Example logic - would need to be expanded based on actual data structure
    if (achievement.trigger === "study_streak" && data.study?.streak) {
      if (achievement.condition(data.study.streak)) {
        return achievement;
      }
    }
  }
  
  return null;
}

export function generateMotivationalMessage(data: any): string {
  const { tasks, study, productivity } = data;
  
  if (tasks?.completionRate >= 80) {
    return "🎉 Amazing job on your task completion rate! You're crushing it!";
  }
  
  if (study?.streak >= 5) {
    return `🔥 ${study.streak} day study streak! Your consistency is inspiring!`;
  }
  
  if (productivity?.score >= 85) {
    return "⚡ Your productivity is through the roof! Keep up the excellent work!";
  }
  
  return getRandomQuote();
}
