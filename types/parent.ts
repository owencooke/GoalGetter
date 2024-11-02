import { Goal } from "./goals";

export interface Parent {
  id: string;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  goals: Goal[];
}
