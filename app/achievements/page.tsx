"use client";

import { useState } from "react";
import { Award, Check, ChevronLeft, Lock, Star, Zap } from "lucide-react";
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

type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  collected: boolean;
  progress: number;
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Steps",
      description: "Walk 1000 steps in a day",
      icon: <Zap className="h-6 w-6" />,
      collected: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Sleep Champion",
      description: "Get 8 hours of sleep for 7 days",
      icon: <Star className="h-6 w-6" />,
      collected: true,
      progress: 100,
    },
    {
      id: 3,
      title: "Active Adventurer",
      description: "Complete 10 different activities",
      icon: <Award className="h-6 w-6" />,
      collected: false,
      progress: 60,
    },
    {
      id: 4,
      title: "Hydration Hero",
      description: "Drink 8 glasses of water for 5 days",
      icon: <Zap className="h-6 w-6" />,
      collected: false,
      progress: 40,
    },
    {
      id: 5,
      title: "Streak Superstar",
      description: "Maintain a 30-day activity streak",
      icon: <Star className="h-6 w-6" />,
      collected: false,
      progress: 20,
    },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Achievements
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={
                  achievement.collected ? "bg-secondary/20" : "bg-card"
                }
              >
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div
                    className={`mr-4 rounded-full p-2 ${
                      achievement.collected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center">
                      {achievement.title}
                      {achievement.collected && (
                        <Check className="ml-2 h-4 w-4 text-primary" />
                      )}
                    </CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                  {!achievement.collected && (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardHeader>
                <CardContent>
                  <Progress value={achievement.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {achievement.progress}% complete
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
