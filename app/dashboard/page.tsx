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

export default function KidsDashboard() {
  const [stepCount, setStepCount] = useState(6234);
  const [streakDays, setStreakDays] = useState(5);
  const [sleepHours, setSleepHours] = useState(8.5);

  const dailyStepGoal = 10000;
  const stepProgress = (stepCount / dailyStepGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-300 flex items-center justify-center">
              <User className="w-10 h-10 md:w-12 md:h-12 text-yellow-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
              Hi, Tommy!
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-4 md:space-x-6">
              <li>
                <Home className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </li>
              <li>
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </li>
              <li>
                <Award className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </li>
            </ul>
          </nav>
        </header>

        <main className="space-y-6 md:space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-800">
              Today's Activity
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">
                  {stepCount}
                </p>
                <p className="text-sm md:text-base text-blue-800">Steps</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold text-green-600">
                  {streakDays}
                </p>
                <p className="text-sm md:text-base text-green-800">
                  Day Streak
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold text-purple-600">
                  {sleepHours}
                </p>
                <p className="text-sm md:text-base text-purple-800">
                  Hours of Sleep
                </p>
              </div>
            </div>
          </section>

          <div className="md:grid md:grid-cols-2 md:gap-6">
            <section className="bg-white rounded-xl p-6 shadow-lg mb-6 md:mb-0">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-800">
                Step Goal Progress
              </h2>
              <div className="space-y-2">
                <Progress value={stepProgress} className="h-4 md:h-6" />
                <p className="text-sm md:text-base text-blue-600 font-medium">
                  {stepCount} / {dailyStepGoal} steps
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-800">
                Your Achievements
              </h2>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                    <Star className="w-10 h-10 md:w-12 md:h-12 text-yellow-500" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-yellow-700">
                    Star Stepper
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Moon className="w-10 h-10 md:w-12 md:h-12 text-green-500" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-green-700">
                    Sleep Champ
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <Award className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-purple-700">
                    5 Day Streak
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="mt-8 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base flex items-center justify-center mx-auto transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            See More <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </button>
        </footer>
      </div>
    </div>
  );
}
