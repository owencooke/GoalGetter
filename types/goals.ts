import { GoalType } from "./goalTypes";

export interface Goal {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    type: GoalType;
    threshold: number;
    dateCreated: Date;
}
