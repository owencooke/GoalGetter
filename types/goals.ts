export type GoalType = "stepsTaken" | "hoursSlept" | "caloriesBurned";

export interface Goal {
  id?: number;
  title: string;
  completed: boolean;
  type: GoalType;
  threshold: number;
  dateCreated?: Date;
}
