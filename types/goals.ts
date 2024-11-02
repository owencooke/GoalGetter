export type GoalType = "stepCount" | "hoursOfSleep" | "calories";

export interface Goal {
  id?: number;
  title: string;
  completed: boolean;
  type: GoalType;
  threshold: number;
  dateCreated?: Date;
}
