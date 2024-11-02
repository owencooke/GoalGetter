'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data - replace with actual data fetching logic
const activityData = [
  { date: '03/01', steps: 8000, calories: 300, sleep: 7.5 },
  { date: '03/02', steps: 10000, calories: 350, sleep: 8 },
  { date: '03/03', steps: 7500, calories: 280, sleep: 7 },
  { date: '03/04', steps: 9000, calories: 320, sleep: 8.5 },
  { date: '03/05', steps: 11000, calories: 400, sleep: 7.5 },
  { date: '03/06', steps: 8500, calories: 310, sleep: 8 },
  { date: '03/07', steps: 9500, calories: 340, sleep: 7.5 },
  { date: '03/08', steps: 12000, calories: 450, sleep: 6.5 },
  { date: '03/09', steps: 7000, calories: 250, sleep: 8 },
  { date: '03/10', steps: 9300, calories: 370, sleep: 7 },
  { date: '03/11', steps: 11500, calories: 420, sleep: 6.8 },
  { date: '03/12', steps: 10000, calories: 350, sleep: 8.1 },
  { date: '03/13', steps: 10500, calories: 390, sleep: 7.7 },
  { date: '03/14', steps: 8000, calories: 300, sleep: 7.2 },
  { date: '03/15', steps: 9500, calories: 370, sleep: 7.5 },
  { date: '03/16', steps: 11000, calories: 400, sleep: 8 },
  { date: '03/17', steps: 8200, calories: 330, sleep: 6.5 },
  { date: '03/18', steps: 10700, calories: 410, sleep: 7.5 },
  { date: '03/19', steps: 9800, calories: 360, sleep: 8.2 },
  { date: '03/20', steps: 8600, calories: 300, sleep: 7.8 },
  { date: '03/21', steps: 9200, calories: 320, sleep: 7.1 },
  { date: '03/22', steps: 11000, calories: 430, sleep: 7.3 },
  { date: '03/23', steps: 12500, calories: 480, sleep: 6.9 },
  { date: '03/24', steps: 7500, calories: 280, sleep: 7.4 },
  { date: '03/25', steps: 9400, calories: 360, sleep: 8 },
  { date: '03/26', steps: 10700, calories: 410, sleep: 7.6 },
  { date: '03/27', steps: 11500, calories: 450, sleep: 7.2 },
  { date: '03/28', steps: 8100, calories: 320, sleep: 8 },
  { date: '03/29', steps: 8900, calories: 330, sleep: 7.5 },
  { date: '03/30', steps: 10600, calories: 400, sleep: 6.8 },
  { date: '03/31', steps: 9500, calories: 370, sleep: 7.9 },
];

export default function ActivityPage() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [activeTab, setActiveTab] = useState<'steps' | 'calories' | 'sleep'>('steps');

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
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
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
              <YAxis 
                tick={{ fontSize: 12 }}
                width={60}
              >
                <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
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
            <BarChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
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
              <YAxis 
                tick={{ fontSize: 12 }}
                width={60}
              >
                <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
              </YAxis>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </ChartContainer>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Activity Dashboard</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Tabs value={activeTab} onValueChange={(value: 'steps' | 'calories' | 'sleep') => setActiveTab(value)} className="w-full sm:w-auto mb-4 sm:mb-0">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex space-x-2">
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            onClick={() => setChartType('line')}
            size="sm"
          >
            Line
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            onClick={() => setChartType('bar')}
            size="sm"
          >
            Bar
          </Button>
        </div>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            {chartType === 'line' ? 'Daily Activity Trends' : 'Daily Activity Comparison'}
          </CardTitle>
          <CardDescription>Your activity over the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="steps">
              {activeTab === 'steps' && renderChart('steps', 'hsl(var(--chart-1))', 'Steps')}
            </TabsContent>
            <TabsContent value="calories">
              {activeTab === 'calories' && renderChart('calories', 'hsl(var(--chart-2))', 'Calories')}
            </TabsContent>
            <TabsContent value="sleep">
              {activeTab === 'sleep' && renderChart('sleep', 'hsl(var(--chart-3))', 'Hours')}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}