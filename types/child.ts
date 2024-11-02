import { Goal } from "./goals";
import { DailyStats } from "./stats";

export interface Child {
    childId: number;
    firstName: string;
    lastname: string;
    phoneNumber: string;
    lat: number;
    long: number;
    dailyStats: DailyStats[];
}
