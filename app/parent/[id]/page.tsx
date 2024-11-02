"use client";

import { useState, useEffect } from "react";
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
import { Plus, X, Check } from "lucide-react";
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parent Dashboard</h1>

      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <Plus className="mr-2 h-4 w-4" /> Add New Goal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>Set a new goal for your child</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="goal-type">Goal Type</Label>
              <Select
                value={newGoal.type}
                onValueChange={(value: GoalType) =>
                  setNewGoal({ ...newGoal, type: value })
                }
              >
                <SelectTrigger id="goal-type">
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stepCount">Step Count</SelectItem>
                  {/* Add more goal types here in the future */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="goal-description">Goal Description</Label>
              <Input
                id="goal-description"
                placeholder="Enter goal description"
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
              />
            </div>
            {newGoal.type === "stepCount" && (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="threshold">Goal Threshold</Label>
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
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={addGoal}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Current Goals</CardTitle>
          <CardDescription>Track your child's progress</CardDescription>
        </CardHeader>
        <CardContent>
          {parent?.goals.length === 0 ? (
            <p className="text-muted-foreground">No goals set yet.</p>
          ) : (
            <ul className="space-y-4">
              {parent?.goals.map((goal) => (
                <li
                  key={goal.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <span
                      className={
                        goal.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }
                    >
                      {goal.description}
                    </span>
                    {goal.type === "stepCount" && (
                      <p className="text-sm text-muted-foreground">
                        Step Count Goal: {goal.threshold}
                      </p>
                    )}
                  </div>
                  <Badge variant={goal.completed ? "outline" : "default"}>
                    {goal.completed ? "Completed ✅" : "In Progress ⏳"}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
