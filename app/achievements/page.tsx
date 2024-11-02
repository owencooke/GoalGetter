"use client";

import { useState, useEffect } from "react";
import { Check, ChevronLeft, Lock, Zap, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Parent } from "@/types/parent";
import { Child } from "@/types/child";
import { Goal, GoalType } from "@/types/goals";
import { DailyStats } from "@/types/stats";

export default function GoalsPage() {
  const [parent, setParent] = useState<Parent | null>(null);
  const [child, setChild] = useState<Child | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parentsResponse = await fetch("/api/parents");
        const parents: Parent[] = await parentsResponse.json();
        if (parents.length > 0) {
          setParent(parents[0]);
        }

        const childrenResponse = await fetch("/api/children");
        const children: Child[] = await childrenResponse.json();
        if (children.length > 0) {
          setChild(children[0]); // Assuming we're working with the first child
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const getIconForGoalType = (type: GoalType) => {
    switch (type) {
      case "stepCount":
        return <Zap className="h-6 w-6" />;
      case "hoursOfSleep":
        return <Moon className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const getProgressForGoal = (goal: Goal, dailyStats: DailyStats[]) => {
    if (!dailyStats || dailyStats.length === 0) return 0;

    const latestStats = dailyStats[dailyStats.length - 1]; // Get the most recent stats

    switch (goal.type) {
      case "stepCount":
        return Math.min((latestStats.stepsTaken / goal.threshold) * 100, 100);
      case "hoursOfSleep":
        return Math.min((latestStats.hoursSlept / goal.threshold) * 100, 100);
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Goals</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {parent?.goals.map((goal) => {
              const progress = child
                ? getProgressForGoal(goal, child.dailyStats)
                : 0;
              const isCompleted = progress >= 100;

              return (
                <Card
                  key={goal.id}
                  className={isCompleted ? "bg-secondary/20" : "bg-card"}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div
                      className={`mr-4 rounded-full p-2 ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {getIconForGoalType(goal.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center">
                        {goal.title}
                        {isCompleted && (
                          <Check className="ml-2 h-4 w-4 text-primary" />
                        )}
                      </CardTitle>
                      <CardDescription>
                        {goal.type === "stepCount"
                          ? `${goal.threshold} steps`
                          : `${goal.threshold} hours of sleep`}
                      </CardDescription>
                    </div>
                    {!isCompleted && (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(progress)}% complete
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
