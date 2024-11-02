'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, progress, useAnimation, Variants } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Trophy, Footprints, Target, Flame, Moon, ChevronRight } from 'lucide-react'
import type { Child } from '@/types/child'
import type { Parent } from '@/types/parent'
import ky from 'ky'
import { getDailyStats } from '@/lib/utils'

const getParent = async () => {
  try {
    const parents = await ky.get('/api/parents').json<Parent[]>()
    return parents;
  } catch (err) {
    console.error('Failed to get parents:', err)
  }
}

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
}

export default function KidsDashboard({ child }: { child: Child }) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [todayStats, setTodayStats] = useState<Object | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    getParent().then((parent) => {
      if (parent) {
        console.log('Parent:', parent);
        setParent(parent[0]);
        console.log(getDailyStats(parent));
        setTodayStats(getDailyStats(parent));
        controls.start("visible");
      }
    })
  }, [controls, setTodayStats])

  const dailyActivity = {
    steps: 8423,
    calories: 320,
    distance: 6.7,
    sleep: 8.5,
  }

  const achievements = [
    { id: 1, title: 'First 1000 Steps', completed: true },
    { id: 2, title: 'Week-long Streak', completed: true },
    { id: 3, title: 'Marathon Master', completed: false },
  ]

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
        <Link href="/goal" className="block">
          <Card className="hover:shadow-md transition-all duration-500 transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="mr-2 text-primary" />
                <TypingAnimation text="Current Goals" delay={200} />
              </CardTitle>
            </CardHeader>
            {parent && parent.goals.map((currentGoal, index) => {
              let progressValue = 0;
              let currentValue = 0;
              console.log(currentGoal)

              // Determine current value and progress based on goal type
              if (currentGoal.type === "stepCount") {
                currentValue = todayStats?.stepsTaken || 0;
                progressValue = (currentValue / currentGoal.threshold) * 100;
              } else if (currentGoal.type === "hoursOfSleep") {
                currentValue = todayStats?.hoursSlept || 0;
                progressValue = (currentValue / currentGoal.threshold) * 100;
              } else if (currentGoal.type === "calories") {
                currentValue = todayStats?.caloriesBurned || 0;
                progressValue = (currentValue / currentGoal.threshold) * 100;
              }

              if (progressValue >= 100 || currentGoal.completed) {
                return;
              }

              return (
                <CardContent key={index}>
                  <h3 className="text-xl font-semibold mb-2">
                    <TypingAnimation text={currentGoal.title} delay={400} />
                  </h3>
                  <AnimatedProgress value={progressValue} delay={600} />
                  <div className="flex justify-between mt-2 text-sm">
                    <p>{currentValue} / {currentGoal.threshold} {currentGoal.type === "stepCount" ? "steps" : currentGoal.type === "hoursOfSleep" ? "hours" : "calories"}</p>
                    <p>{progressValue.toFixed(2)}% complete</p>
                  </div>
                </CardContent>
              );
            })}
          </Card>
        </Link>
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
                <TypingAnimation text="Today's Activity" delay={800} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <ActivityItem icon={Footprints} value={todayStats ? todayStats?.stepsTaken : 0} label="steps" delay={1000} />
                <ActivityItem icon={Flame} value={todayStats ? todayStats?.caloriesBurned : 0} label="calories" delay={1200} />
                <ActivityItem icon={Moon} value={todayStats ? todayStats?.hoursSlept: 0} label="hours" delay={1400} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary">
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
                <TypingAnimation text="My Achievements" delay={1600} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <li key={achievement.id} className="flex items-center">
                    <Trophy
                      className={`mr-4 h-6 w-6 ${
                        achievement.completed ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    />
                    <span
                      className={`text-lg ${
                        achievement.completed ? 'font-medium' : 'text-muted-foreground'
                      }`}
                    >
                      <TypingAnimation text={achievement.title} delay={1800 + index * 200} />
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary">
                View All Achievements <ChevronRight size={20} />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </motion.div>
    </div>
  )
}

function ActivityItem({ icon: Icon, value, label, delay }: { icon: React.ElementType, value: number, label: string, delay: number }) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg transition-colors duration-500 hover:bg-primary/10">
      <Icon className="mb-2 text-primary" size={32} />
      <TypingAnimation text={value.toString()} delay={delay} className="text-3xl font-bold" />
      <TypingAnimation text={label} delay={delay + 200} className="text-sm text-muted-foreground" />
    </div>
  )
}

function TypingAnimation({ text, delay = 0, className = '' }: { text: string, delay?: number, className?: string }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => text.slice(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span className={className}>{displayedText}</span>
}

function AnimatedProgress({ value, delay = 0 }: { value: number, delay?: number }) {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animationDuration = 1000 // 1 second
      const startTime = Date.now()

      const animate = () => {
        const elapsedTime = Date.now() - startTime
        if (elapsedTime < animationDuration) {
          const progress = elapsedTime / animationDuration
          setCurrentValue(value * progress)
          requestAnimationFrame(animate)
        } else {
          setCurrentValue(value)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return <Progress value={currentValue} className="w-full h-4 rounded-full" />
}