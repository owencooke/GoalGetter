import { Goal } from "./goals";

interface Parent {
    phoneNumber: string;
    Goals: Goal[];
    dailyStepThreshold: number;
    dateCreated: Date;
    description: string;
    title: string;
    completed: boolean;
}
