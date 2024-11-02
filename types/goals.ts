export type GoalType = "stepCount" | "hoursOfSleep";

export interface Goal {
  id?: number;
  description: string;
  completed: boolean;
  type: GoalType;
  threshold: number;
}
