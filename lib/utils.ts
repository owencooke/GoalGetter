import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Parent } from "@/types/parent";
import { DailyStats } from "@/types/stats";
import { Goal } from "@/types/goals";

/**
 * Gets the most recent daily stats of the first child of the first parent.
 * @param parents An array of Parent objects
 * @returns The most recent DailyStats object or null if not available
 */
export function getDailyStats(parents: Parent[]): DailyStats | null {
  // Check if there are any parents
  if (parents.length === 0) {
    console.warn("No parents found");
    return null;
  }

  const firstParent = parents[0];

  if (firstParent.children.length === 0) {
    console.warn("First parent has no children");
    return null;
  }

  const firstChild = firstParent.children[0];

  if (firstChild.dailyStats.length === 0) {
    console.warn("First child has no daily stats");
    return null;
  }

  return firstChild.dailyStats[firstChild.dailyStats.length - 1];
}

export const getProgressForGoal = (goal: Goal, stats: DailyStats | null) => {
  if (!stats) return 0;

  switch (goal.type) {
    case "stepCount":
      return Math.min((stats.stepsTaken / goal.threshold) * 100, 100);
    case "hoursOfSleep":
      return Math.min((stats.hoursSlept / goal.threshold) * 100, 100);
    case "calories":
      return Math.min((stats.caloriesBurned / goal.threshold) * 100, 100);
    default:
      return 0;
  }
};

export const getGoalDescription = (goal: Goal) => {
  switch (goal.type) {
    case "stepCount":
      return `${goal.threshold} steps`;
    case "hoursOfSleep":
      return `${goal.threshold} hours of sleep`;
    case "calories":
      return `${goal.threshold} calories burned`;
    default:
      return "";
  }
};
