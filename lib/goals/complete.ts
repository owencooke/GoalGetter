import { Child } from "@/types/child";
import { Goal } from "@/types/goals";

export function checkGoalsCompletion(child: Child, goals: Goal[]): Goal[] {
  const completedGoals: Goal[] = [];

  goals.forEach((goal) => {
    child.dailyStats.forEach((stats) => {
      if (
        (goal.type === "stepsTaken" && stats.stepsTaken >= goal.threshold) ||
        (goal.type === "hoursSlept" && stats.hoursSlept >= goal.threshold) ||
        (goal.type === "caloriesBurned" &&
          stats.caloriesBurned >= goal.threshold)
      ) {
        completedGoals.push(goal);
      }
    });
  });

  return completedGoals;
}
