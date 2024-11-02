export interface Goal {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dailyStepThreshold: number;
    dateCreated: Date;
}
