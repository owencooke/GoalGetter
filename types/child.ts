import { Goal } from "./goals";
import { DailyStats } from "./stats";

export interface Child {
  parentId: number;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  lat: number;
  long: number;
  dailyStats: DailyStats[];
}
