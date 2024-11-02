import { Goal } from "./goals";

export interface Parent {
    firstName: string;
    lastname: string;
    phoneNumber: string;
    Goals: Goal[];
}
