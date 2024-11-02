import { Goal } from "@/types/goals";
import { DailyStats } from "@/types/stats";

export function checkGoalsCompletion(stats: DailyStats, goals: Goal[]): Goal[] {
  const completedGoals: Goal[] = [];

  goals.forEach((goal) => {
    if (
      (goal.type === "stepsTaken" && stats.stepsTaken >= goal.threshold) ||
      (goal.type === "hoursSlept" && stats.hoursSlept >= goal.threshold) ||
      (goal.type === "caloriesBurned" && stats.caloriesBurned >= goal.threshold)
    ) {
      completedGoals.push(goal);
    }
  });

  return completedGoals;
}
