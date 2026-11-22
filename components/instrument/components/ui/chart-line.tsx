"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

// Gauge Dark line chart: a thin gold needle trace over the grid.

const chartData = [
  { month: "January", latency: 186 },
  { month: "February", latency: 305 },
  { month: "March", latency: 237 },
  { month: "April", latency: 73 },
  { month: "May", latency: 209 },
  { month: "June", latency: 214 },
];

const chartConfig = {
  latency: {
    label: "Latency (ms)",
    color: "var(--chart-1)",
  },
};

export function ChartLineDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>P95 Latency</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="latency"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Trending up by 5.2% this month</div>
        <div className="leading-none text-muted-foreground">Aggregated across all machines</div>
      </CardFooter>
    </Card>
  );
}
