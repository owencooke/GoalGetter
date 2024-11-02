"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Footprints,
  Target,
  Flame,
  Moon,
  ChevronRight,
} from "lucide-react";
import type { Child } from "@/types/child";
import type { Parent } from "@/types/parent";
import type { DailyStats } from "@/types/stats";
import type { Goal } from "@/types/goals";
import ky from "ky";
import {
  getDailyStats,
  getProgressForGoal,
  getGoalDescription,
} from "@/lib/utils";

const getParent = async () => {
  try {
    const parents = await ky.get("/api/parents").json<Parent[]>();
    return parents;
  } catch (err) {
    console.error("Failed to get parents:", err);
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function KidsDashboard({ child }: { child: Child }) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [todayStats, setTodayStats] = useState<DailyStats | null>(null);
  const [completedGoals, setCompletedGoals] = useState<Goal[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    getParent().then((parents) => {
      if (parents && parents.length > 0) {
        const parent = parents[0];
        setParent(parent);
        const stats = getDailyStats(parents);
        setTodayStats(stats);

        // Filter and sort completed goals
        const completed = parent.goals
          .filter((goal) => getProgressForGoal(goal, stats) >= 100)
          .sort((a, b) => b.threshold - a.threshold)
          .slice(0, 3);
        setCompletedGoals(completed);

        controls.start("visible");
      }
    });
  }, [controls]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Hey, {parent && parent.children[0].firstName}!
      </motion.h1>

      <motion.div
        custom={0}
        initial="hidden"
        animate={controls}
        variants={cardVariants}
      >
        <Card className="hover:shadow-md transition-all duration-500 transform hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Target className="mr-2 text-primary" />
              Current Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {parent &&
              parent.goals.map((goal, index) => {
                const progress = getProgressForGoal(goal, todayStats);
                if (progress >= 100) return null;

                return (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                    <Progress
                      value={progress}
                      className="w-full h-4 rounded-full"
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <p>{getGoalDescription(goal)}</p>
                      <p>{progress.toFixed(2)}% complete</p>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate={controls}
        variants={cardVariants}
      >
        <Link href="/activity" className="block">
          <Card className="hover:shadow-md transition-all duration-500 transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Footprints className="mr-2 text-primary" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <ActivityItem
                  icon={Footprints}
                  value={todayStats?.stepsTaken || 0}
                  label="steps"
                />
                <ActivityItem
                  icon={Flame}
                  value={todayStats?.caloriesBurned || 0}
                  label="calories"
                />
                <ActivityItem
                  icon={Moon}
                  value={todayStats?.hoursSlept || 0}
                  label="hours"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary"
              >
                View Activity Details <ChevronRight size={20} />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </motion.div>

      <motion.div
        custom={2}
        initial="hidden"
        animate={controls}
        variants={cardVariants}
      >
        <Link href="/achievements" className="block">
          <Card className="hover:shadow-md transition-all duration-500 transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Trophy className="mr-2 text-primary" />
                Top Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {completedGoals.map((goal, index) => (
                  <li key={index} className="flex items-center">
                    <Trophy className="mr-4 h-6 w-6 text-yellow-500" />
                    <span className="text-lg font-medium">{goal.title}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary"
              >
                View All Achievements <ChevronRight size={20} />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
}

function ActivityItem({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg transition-colors duration-500 hover:bg-primary/10">
      <Icon className="mb-2 text-primary" size={32} />
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function TypingAnimation({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={className}>{displayedText}</span>;
}

function AnimatedProgress({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animationDuration = 1000; // 1 second
      const startTime = Date.now();

      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < animationDuration) {
          const progress = elapsedTime / animationDuration;
          setCurrentValue(value * progress);
          requestAnimationFrame(animate);
        } else {
          setCurrentValue(value);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return <Progress value={currentValue} className="w-full h-4 rounded-full" />;
}
