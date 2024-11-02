import { Goal } from "./goals";

export interface Parent {
  parentId: number;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  goals: Goal[];
}
