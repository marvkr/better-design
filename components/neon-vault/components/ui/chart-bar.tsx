"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

// Neon Vault bar chart: monthly trading volume in magenta pills.

const chartData = [
  { month: "January", volume: 186 },
  { month: "February", volume: 305 },
  { month: "March", volume: 237 },
  { month: "April", volume: 73 },
  { month: "May", volume: 209 },
  { month: "June", volume: 214 },
]

const chartConfig = {
  volume: {
    label: "Volume",
    color: "var(--chart-1)",
  },
}

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="volume" fill="var(--chart-1)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">Trending up by 5.2% this month</div>
        <div className="leading-none text-muted-foreground">Trading volume for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}
