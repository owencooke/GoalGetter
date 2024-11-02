"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Parent } from "@/types/parent";
import ky from "ky";

const titles = {
  stepsTaken: {
    line: "Daily Steps Trends",
    bar: "Daily Steps Comparison",
  },
  caloriesBurned: {
    line: "Daily Calories Burned Trends",
    bar: "Daily Calories Burned Comparison",
  },
  hoursSlept: {
    line: "Daily Sleep Trends",
    bar: "Daily Sleep Comparison",
  },
};

const descriptions = {
  stepsTaken: "'s steps taken in the past few days",
  caloriesBurned: "'s calories burned in the past few days",
  hoursSlept: "'s hours slept in the past few days",
};

const getParent = async () => {
  try {
    const parents = await ky.get("/api/parents").json<Parent[]>();
    return parents[0];
  } catch (err) {
    console.error("Failed to get parents:", err);
  }
};

export default function ActivityPage() {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [activeTab, setActiveTab] = useState<
    "stepsTaken" | "caloriesBurned" | "hoursSlept"
  >("stepsTaken");
  const [parent, setParent] = useState<Parent | null>(null);
  const activityData = parent?.children[0].dailyStats || [];

  const getTitle = () => titles[activeTab][chartType];
  const getDescription = () =>
    `${parent?.children[0].firstName}${descriptions[activeTab]}`;

  useEffect(() => {
    getParent().then((parent) => {
      if (parent) {
        console.log("Parent:", parent);
        setParent(parent);
      }
    });
  }, []);

  useEffect(() => {}, []);

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const renderChart = (dataKey: string, color: string, yAxisLabel: string) => {
    return (
      <ChartContainer
        config={{
          [dataKey]: {
            label: yAxisLabel,
            color: color,
          },
        }}
        className="h-[350px] w-full"
      >
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        {chartType === "line" ? (
          <LineChart
            data={activityData}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickFormatter={formatXAxis}
              interval={1}
              angle={-45}
              textAnchor="end"
              height={60}
            >
              <Label value="Date" offset={-40} position="insideBottom" />
            </XAxis>
            <YAxis tick={{ fontSize: 12 }} width={60}>
              <Label
                value={yAxisLabel}
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#000"
              strokeWidth={2}
              dot={{ fill: "#000", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        ) : (
          <BarChart
            data={activityData}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickFormatter={formatXAxis}
              interval={1}
              angle={-45}
              textAnchor="end"
              height={60}
            >
              <Label value="Date" offset={-40} position="insideBottom" />
            </XAxis>
            <YAxis tick={{ fontSize: 12 }} width={60}>
              <Label
                value={yAxisLabel}
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} />
          </BarChart>
        )}
        {/* </ResponsiveContainer> */}
      </ChartContainer>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Activity Dashboard
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Tabs
          value={activeTab}
          onValueChange={(value: string) =>
            setActiveTab(
              value as "stepsTaken" | "caloriesBurned" | "hoursSlept"
            )
          }
          className="w-full sm:w-auto mb-4 sm:mb-0"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="stepsTaken">Steps</TabsTrigger>
            <TabsTrigger value="caloriesBurned">Calories</TabsTrigger>
            <TabsTrigger value="hoursSlept">Sleep</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex space-x-2">
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            onClick={() => setChartType("line")}
            size="sm"
          >
            Line
          </Button>
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            onClick={() => setChartType("bar")}
            size="sm"
          >
            Bar
          </Button>
        </div>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value: string) =>
              setActiveTab(
                value as "stepsTaken" | "caloriesBurned" | "hoursSlept"
              )
            }
            className="w-full"
          >
            <TabsContent value="stepsTaken">
              {activeTab === "stepsTaken" &&
                renderChart("stepsTaken", "hsl(var(--chart-1))", "Steps")}
            </TabsContent>
            <TabsContent value="caloriesBurned">
              {activeTab === "caloriesBurned" &&
                renderChart(
                  "caloriesBurned",
                  "hsl(var(--chart-2))",
                  "Calories"
                )}
            </TabsContent>
            <TabsContent value="hoursSlept">
              {activeTab === "hoursSlept" &&
                renderChart("hoursSlept", "hsl(var(--chart-3))", "Hours")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
