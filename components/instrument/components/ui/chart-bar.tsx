"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

// Gauge Dark bar chart: gold instrument bars with a soft top radius.

const chartData = [
  { month: "January", requests: 186 },
  { month: "February", requests: 305 },
  { month: "March", requests: 237 },
  { month: "April", requests: 73 },
  { month: "May", requests: 209 },
  { month: "June", requests: 214 },
];

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
};

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests per Month</CardTitle>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="requests" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Trending up by 5.2% this month</div>
        <div className="leading-none text-muted-foreground">Total requests across all regions</div>
      </CardFooter>
    </Card>
  );
}
