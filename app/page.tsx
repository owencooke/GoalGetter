"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Footprints, Target, Flame, Moon, ChevronRight } from "lucide-react";
import { Child } from "@/types/child";
import { useState, useEffect } from 'react';
import { Parent } from "@/types/parent";
import ky from "ky";

const getParent = async () => {
  try {
    const parents = await ky.get("/api/parents").json<Parent[]>();
    return parents[0];
  } catch (err) {
    console.error("Failed to get parents:", err);
  }
}

export default function KidsDashboard({ child }: { child: Child }) {
  const [stepCount, setStepCount] = useState(6234);
  const [streakDays, setStreakDays] = useState(5);
  const [sleepHours, setSleepHours] = useState(8.5);

  const [parent, setParent] = useState<Parent | null>(null);

  useEffect(() => {
    getParent().then((parent) => {
      if (parent) {
        console.log("Parent:", parent);
        setParent(parent);
      }
    });
  }, []);

  const currentGoal = {
    title: "Walk to the Moon",
    description: "Take enough steps to cover the distance to the moon!",
    progress: 65,
  };

  const dailyActivity = {
    steps: 8423,
    calories: 320,
    distance: 6.7,
    sleep: 8.5,
  };

  const achievements = [
    { id: 1, title: "First 1000 Steps", completed: true },
    { id: 2, title: "Week-long Streak", completed: true },
    { id: 3, title: "Marathon Master", completed: false },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Hey, NAME!</h1>

      {/* Current Goal Progress */}
      <Link href="/goal" className="block">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2" />
              Current Goals
            </CardTitle>
          </CardHeader>
          {parent && parent.goals.map((currentGoal, index) => (
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{currentGoal.title}</h3>
              {/* <p className="text-muted-foreground mb-4">
                {currentGoal.description}
              </p> */}
              <Progress value={100000/currentGoal.threshold} className="w-full" />
              <div className="flex justify-between mt-2">
                <p>{1000} / {currentGoal.threshold} steps</p>
                <p>{(100000 / currentGoal.threshold).toFixed(2)}% complete</p>
              </div>
            </CardContent>
          ))}
        </Card>
      </Link>

      {/* Daily Activity */}
      <Link href="/activity" className="block">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Footprints className="mr-2" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <Footprints className="mb-2 text-primary" size={24} />
              <span className="text-2xl font-bold">{dailyActivity.steps}</span>
              <span className="text-sm text-muted-foreground">steps</span>
            </div>
            <div className="flex flex-col items-center">
              <Flame className="mb-2 text-primary" size={24} />
              <span className="text-2xl font-bold">{dailyActivity.calories}</span>
              <span className="text-sm text-muted-foreground">calories</span>
            </div>
            <div className="flex flex-col items-center">
              <Moon className="mb-2 text-primary" size={24} />
              <span className="text-2xl font-bold">{dailyActivity.sleep}</span>
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full justify-between">
            View Activity Details <ChevronRight size={20} />
          </Button>
        </CardFooter>
      </Card>
    </Link>

      {/* Achievements */}
      <Link href="/achievements" className="block">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2" />
              My Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {achievements.map((achievement) => (
                <li key={achievement.id} className="flex items-center">
                  <Trophy
                    className={`mr-4 h-6 w-6 ${
                      achievement.completed
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-lg ${
                      achievement.completed
                        ? "font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {achievement.title}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between">
              View All Achievements <ChevronRight size={20} />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
