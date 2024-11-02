import { DailyStats } from "./dailyStats";

export interface Kid {
    name: string;
    parentId: number;
    long: number;
    lat: number;
    dailyStats: DailyStats[];
}
