import { Goal } from "./goals";

export interface Child {
  parentId: number;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  goals: Goal[];
}
