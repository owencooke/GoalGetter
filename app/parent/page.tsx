"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Parent } from "@/types/parent";
import { Goal, GoalType } from "@/types/goals";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ky from "ky";

interface NewGoal {
    type: GoalType;
    title: string;
    threshold: number;
}

const defaultNewGoal: NewGoal = {
    type: "stepCount",
    title: "",
    threshold: 0,
};

const getParent = async () => {
    try {
        const parents = await ky.get("/api/parents").json<Parent[]>();
        return parents[0];
    } catch (err) {
        console.error("Failed to get parents:", err);
    }
};

const putParent = async (parent: Parent) => {
    try {
        await ky.put("/api/parents", { json: parent });
    } catch (err) {
        console.error("Failed to update parent:", err);
    }
};

export default function ParentDashboard() {
    const [parent, setParent] = useState<Parent | null>(null);
    const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState<NewGoal>(defaultNewGoal);

    useEffect(() => {
        getParent().then((parent) => {
            if (parent) {
                console.log("Parent:", parent);
                setParent(parent);
            }
        });
    }, []);

    const addGoal = () => {
        if (!parent) return;
        if (newGoal.title.trim() === "") return;

        const goalToAdd: Goal = {
            title: newGoal.title,
            completed: false,
            type: newGoal.type,
            threshold: newGoal.threshold,
        };

        const newParent = {
            ...parent,
            goals: [...parent.goals, goalToAdd],
        };

        // Add new goal to backend
        putParent(newParent);

        setParent(newParent);
        setNewGoal(defaultNewGoal);
        setIsAddGoalOpen(false);
    };

    const deleteGoal = (goalId: number) => {
        setParent((prevParent) => {
            if (!prevParent) return prevParent;
            const updatedParent = {
                ...prevParent,
                goals: prevParent.goals.filter((_, index) => index !== goalId),
            };
            // Update the backend with the new parent data
            putParent(updatedParent);
            return updatedParent;
        });
    };

    return (
        <div className="container mx-auto p-4 bg-background text-foreground">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-8 text-primary"
            >
                Parent Dashboard
            </motion.h1>

            <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-8 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Add New Goal
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-background">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">
                            Create New Goal
                        </DialogTitle>
                        <DialogDescription className="text-secondary-foreground">
                            Set a new goal for your child
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="goal-type" className="text-primary">
                                Goal Type
                            </Label>
                            <Select
                                value={newGoal.type}
                                onValueChange={(value: GoalType) =>
                                    setNewGoal({ ...newGoal, type: value })
                                }
                            >
                                <SelectTrigger
                                    id="goal-type"
                                    className="bg-secondary text-secondary-foreground"
                                >
                                    <SelectValue placeholder="Select goal type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="stepCount">
                                        Step Count
                                    </SelectItem>
                                    <SelectItem value="calories">
                                        Calories
                                    </SelectItem>
                                    <SelectItem value="hoursOfSleep">
                                        Hours of Sleep
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label
                                htmlFor="goal-title"
                                className="text-primary"
                            >
                                Title
                            </Label>
                            <Input
                                id="goal-title"
                                placeholder="Enter an exciting title!"
                                value={newGoal.title}
                                onChange={(e) =>
                                    setNewGoal({
                                        ...newGoal,
                                        title: e.target.value,
                                    })
                                }
                                className="bg-secondary text-secondary-foreground"
                            />
                        </div>
                        {newGoal.type && (
                            <div className="flex flex-col space-y-2">
                                <Label
                                    htmlFor="threshold"
                                    className="text-primary"
                                >
                                    Goal Threshold
                                </Label>
                                <Input
                                    id="threshold"
                                    type="number"
                                    placeholder="0"
                                    min={0}
                                    value={
                                        newGoal.threshold === 0
                                            ? ""
                                            : newGoal.threshold
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNewGoal({
                                            ...newGoal,
                                            threshold:
                                                value === ""
                                                    ? 0
                                                    : parseInt(value, 10),
                                        });
                                    }}
                                    className="bg-secondary text-secondary-foreground"
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={addGoal}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Add Goal
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="bg-card text-card-foreground">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">
                            Current Goals
                        </CardTitle>
                        <CardDescription className="text-secondary-foreground">
                            Track your child's progress
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {parent?.goals.length === 0 ? (
                            <p className="text-muted-foreground">
                                No goals set yet.
                            </p>
                        ) : (
                            <AnimatePresence>
                                {parent?.goals.map((goal, idx) => (
                                    <motion.div
                                        key={goal.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="mb-4 p-4 border border-border rounded-lg bg-card"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-primary">
                                                    {goal.title}
                                                </h3>
                                                {goal.type === "stepCount" && (
                                                    <p className="text-sm text-secondary-foreground">
                                                        Step Count Goal:{" "}
                                                        {goal.threshold}
                                                    </p>
                                                )}
                                                {goal.type === "calories" && (
                                                    <p className="text-sm text-secondary-foreground">
                                                        Calories Burned Goal:{" "}
                                                        {goal.threshold}
                                                    </p>
                                                )}
                                                {goal.type ===
                                                    "hoursOfSleep" && (
                                                    <p className="text-sm text-secondary-foreground">
                                                        Hours of Sleep Goal:{" "}
                                                        {goal.threshold}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Badge
                                                    variant={
                                                        goal.type
                                                            ? "secondary"
                                                            : "default"
                                                    }
                                                >
                                                    {(() => {
                                                        const latestStats =
                                                            parent.children[0]?.dailyStats?.at(
                                                                -1
                                                            );
                                                        if (!latestStats)
                                                            return "No Data from child today";

                                                        if (
                                                            (goal.type ===
                                                                "stepCount" &&
                                                                latestStats.stepsTaken >=
                                                                    goal.threshold) ||
                                                            (goal.type ===
                                                                "calories" &&
                                                                latestStats.caloriesBurned >=
                                                                    goal.threshold) ||
                                                            (goal.type ===
                                                                "hoursOfSleep" &&
                                                                latestStats.hoursSlept >=
                                                                    goal.threshold)
                                                        ) {
                                                            return "Completed ✅ By";
                                                        } else {
                                                            return "In Progress ⏳";
                                                        }
                                                    })()}
                                                </Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        deleteGoal(idx)
                                                    }
                                                    className="text-destructive hover:text-destructive/90"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
