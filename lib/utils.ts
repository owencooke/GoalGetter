import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Parent } from "@/types/parent";
import { DailyStats } from "@/types/stats";

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

  // Check if the first parent has any children
  if (firstParent.children.length === 0) {
    console.warn("First parent has no children");
    return null;
  }

  const firstChild = firstParent.children[0];

  // Check if the first child has any daily stats
  if (firstChild.dailyStats.length === 0) {
    console.warn("First child has no daily stats");
    return null;
  }

  // Return the most recent daily stats
  return firstChild.dailyStats[firstChild.dailyStats.length - 1];
}
