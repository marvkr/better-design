"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

// Gauge Dark area chart: a gold metric band over the panel, the chart plot
// reads like a live connections graph on an ops dashboard.

const chartData = [
  { month: "January", connections: 186 },
  { month: "February", connections: 305 },
  { month: "March", connections: 237 },
  { month: "April", connections: 73 },
  { month: "May", connections: 209 },
  { month: "June", connections: 214 },
];

const chartConfig = {
  connections: {
    label: "Connections",
    color: "var(--chart-1)",
  },
};

export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Connections</CardTitle>
        <CardDescription>Total connections for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="connections"
              type="natural"
              fill="var(--chart-1)"
              fillOpacity={0.25}
              stroke="var(--chart-1)"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Trending up by 5.2% this month</div>
        <div className="leading-none text-muted-foreground">January - June 2024</div>
      </CardFooter>
    </Card>
  );
}
