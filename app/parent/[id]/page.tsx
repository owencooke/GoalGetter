"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Parent } from "@/types/parents";
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

interface NewGoal {
  type: GoalType;
  description: string;
  threshold: number;
}

const defaultNewGoal: NewGoal = {
  type: "stepCount",
  description: "",
  threshold: 0,
};

export default function ParentDashboard({
  params,
}: {
  params: { id: string };
}) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<NewGoal>(defaultNewGoal);
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/api/parent/${id}`)
        .then((response) => response.json())
        .then((data) => setParent(data))
        .catch((error) => console.error("Error fetching parent data:", error));
    }
  }, [id]);

  const addGoal = () => {
    if (newGoal.description.trim() === "") return;

    const goalToAdd: Goal = {
      description: newGoal.description,
      completed: false,
      type: newGoal.type,
      threshold: newGoal.threshold,
    };

    setParent((prevParent) => {
      if (!prevParent) return { phoneNumber: "", goals: [goalToAdd] };
      return {
        ...prevParent,
        goals: [...prevParent.goals, goalToAdd],
      };
    });

    // TODO: post new goal to backend

    setNewGoal(defaultNewGoal);
    setIsAddGoalOpen(false);
  };

  const deleteGoal = (goalId: number) => {
    setParent((prevParent) => {
      if (!prevParent) return prevParent;
      return {
        ...prevParent,
        goals: prevParent.goals.filter((goal) => goal.id !== goalId),
      };
    });
    // TODO: delete goal in backend
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
                  <SelectItem value="stepCount">Step Count</SelectItem>
                  {/* Add more goal types here in the future */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="goal-description" className="text-primary">
                Goal Description
              </Label>
              <Input
                id="goal-description"
                placeholder="Enter goal description"
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
                className="bg-secondary text-secondary-foreground"
              />
            </div>
            {newGoal.type === "stepCount" && (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="threshold" className="text-primary">
                  Goal Threshold
                </Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="Enter step count threshold"
                  min={0}
                  value={newGoal.threshold === 0 ? "" : newGoal.threshold}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewGoal({
                      ...newGoal,
                      threshold: value === "" ? 0 : parseInt(value, 10),
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
              <p className="text-muted-foreground">No goals set yet.</p>
            ) : (
              <AnimatePresence>
                {parent?.goals.map((goal) => (
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
                          {goal.description}
                        </h3>
                        {goal.type === "stepCount" && (
                          <p className="text-sm text-secondary-foreground">
                            Step Count Goal: {goal.threshold}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={goal.completed ? "secondary" : "default"}
                        >
                          {goal.completed ? "Completed ✅" : "In Progress ⏳"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            goal.id && deleteGoal(goal.id);
                          }}
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
