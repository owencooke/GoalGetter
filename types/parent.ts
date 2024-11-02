import { Goal } from "./goals";
import { Child } from "./child";

export interface Parent {
    firstName: string;
    lastname: string;
    phoneNumber: string;
    lat: number;
    long: number;
    children: Child[];
    goals: Goal[];
}
