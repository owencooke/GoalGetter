import { Goal } from "@/types/goals";
import { DailyStats } from "@/types/stats";

function checkGoalCompletion(goal: Goal, dailyStats: DailyStats): boolean {
  // Check if goal or dailyStats is null
  if (goal == null || dailyStats == null) {
    return false;
  }

  // Check if required properties exist and are not null
  if (goal.type == null || goal.threshold == null) {
    return false;
  }

  switch (goal.type) {
    case "stepCount":
      return (
        dailyStats.stepsTaken != null && dailyStats.stepsTaken > goal.threshold
      );
    case "calories":
      return (
        dailyStats.caloriesBurned != null &&
        dailyStats.caloriesBurned > goal.threshold
      );
    case "hoursOfSleep":
      return (
        dailyStats.hoursSlept != null && dailyStats.hoursSlept > goal.threshold
      );
    default:
      return false;
  }
}

export function checkGoalsCompletion(stats: DailyStats, goals: Goal[]): Goal[] {
  return goals.filter((goal) => checkGoalCompletion(goal, stats));
}
