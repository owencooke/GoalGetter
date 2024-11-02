import { Goal } from "./goals";

export interface Parent {
  phoneNumber: string;
  goals: Goal[];
  dailyStepThreshold: number;
  dateCreated: Date;
  description: string;
  title: string;
  completed: boolean;
}
