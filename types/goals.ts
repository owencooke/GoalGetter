export type GoalType = "stepCount" | "calories" | "hoursOfSleep";

export interface Goal {
  id?: number;
  title: string;
  completed: boolean;
  type: GoalType;
  threshold: number;
  dateCreated?: Date;
}
