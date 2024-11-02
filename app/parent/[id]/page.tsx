"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Parent } from "@/types/parents";
import { Goal } from "@/types/goals";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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

export default function ParentDashboard({
  params,
}: {
  params: { id: string };
}) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [useStepThreshold, setUseStepThreshold] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [newStepThreshold, setNewStepThreshold] = useState("");
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
    if (newGoalDescription.trim() === "") return;

    const newGoal: Goal = {
      id: Date.now(),
      description: newGoalDescription,
      completed: false,
    };

    // TODO: post new goal
    setParent((prevParent) => {
      if (!prevParent) return prevParent;
      return {
        ...prevParent,
        goals: [...prevParent.goals, newGoal],
      };
    });

    setNewGoalDescription("");
    setIsAddGoalOpen(false);
  };

  const toggleGoalCompletion = (goalId: number) => {
    setParent((prevParent) => {
      if (!prevParent) return prevParent;
      return {
        ...prevParent,
        goals: prevParent.goals.map((goal) =>
          goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        ),
      };
    });
  };

  const updateStepThreshold = () => {
    const threshold = parseInt(newStepThreshold);
    if (isNaN(threshold)) return;

    setParent((prevParent) => {
      if (!prevParent) return prevParent;
      return {
        ...prevParent,
        dailyStepThreshold: threshold,
      };
    });

    // TODO: update step threshold in the backend
    setNewStepThreshold("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Parent Dashboard</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Daily Step Threshold</CardTitle>
          <CardDescription>
            Set the daily step count goal for your child
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={newStepThreshold}
              onChange={(e) => setNewStepThreshold(e.target.value)}
              placeholder={`Current: ${parent?.dailyStepThreshold || 0} steps`}
            />
            <Button onClick={updateStepThreshold}>Update</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <Plus className="mr-2 h-4 w-4" /> Add New Goal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>
              Set a new step count goal for your child
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="goal-description">Goal Description</Label>
              <Input
                id="goal-description"
                placeholder="Enter goal description"
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="use-threshold"
                checked={useStepThreshold}
                onCheckedChange={setUseStepThreshold}
              />
              <Label htmlFor="use-threshold">
                Use daily step threshold ({parent?.dailyStepThreshold} steps)
              </Label>
            </div>
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
                  <span
                    className={
                      goal.completed ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {goal.description}
                  </span>
                  <Button
                    variant={goal.completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleGoalCompletion(goal.id)}
                  >
                    {goal.completed ? (
                      <X className="mr-2 h-4 w-4" />
                    ) : (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    {goal.completed ? "Undo" : "Complete"}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
