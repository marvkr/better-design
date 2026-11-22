"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"

// Neon Vault radar: monthly activity spread on the vault grid.

const chartData = [
  { month: "January", activity: 186 },
  { month: "February", activity: 305 },
  { month: "March", activity: 237 },
  { month: "April", activity: 273 },
  { month: "May", activity: 209 },
  { month: "June", activity: 214 },
]

const chartConfig = {
  activity: {
    label: "Activity",
    color: "var(--chart-1)",
  },
}

export function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart</CardTitle>
        <CardDescription>Trading activity for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[15.625rem]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar dataKey="activity" fill="var(--chart-1)" fillOpacity={0.5} stroke="var(--chart-1)" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">Trending up by 5.2% this month</div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">January - June 2024</div>
      </CardFooter>
    </Card>
  )
}
