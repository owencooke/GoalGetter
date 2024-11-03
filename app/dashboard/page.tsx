"use client";

import { useState } from "react";
import {
  Moon,
  Star,
  Award,
  Home,
  ChevronRight,
  Activity,
  User,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function KidsDashboard() {
  const [stepCount, setStepCount] = useState(6234);
  const [streakDays, setStreakDays] = useState(5);
  const [sleepHours, setSleepHours] = useState(8.5);

  const dailyStepGoal = 10000;
  const stepProgress = (stepCount / dailyStepGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Hi, Tommy!
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-4 md:space-x-6">
              <li>
                <Home className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </li>
              <li>
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </li>
              <li>
                <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </li>
            </ul>
          </nav>
        </header>

        <main className="space-y-6 md:space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                {`Today's Activity`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {stepCount}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Steps
                  </p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {streakDays}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Day Streak
                  </p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {sleepHours}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Hours of Sleep
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:grid md:grid-cols-2 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Step Goal Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={stepProgress} className="h-4 md:h-6" />
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    {stepCount} / {dailyStepGoal} steps
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-2">
                      <Star className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                    </div>
                    <p className="text-sm md:text-base font-medium text-muted-foreground">
                      Star Stepper
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-2">
                      <Moon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                    </div>
                    <p className="text-sm md:text-base font-medium text-muted-foreground">
                      Sleep Champ
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-2">
                      <Award className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                    </div>
                    <p className="text-sm md:text-base font-medium text-muted-foreground">
                      5 Day Streak
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="mt-8 text-center">
          <Button size="lg" className="font-semibold">
            See More <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </footer>
      </div>
    </div>
  );
}
