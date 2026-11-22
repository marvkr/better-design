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

const chartData = [
  { month: "May", closed: 42 },
  { month: "June", closed: 58 },
  { month: "July", closed: 51 },
  { month: "August", closed: 37 },
  { month: "September", closed: 64 },
  { month: "October", closed: 71 },
];

const chartConfig = {
  closed: { label: "Tasks closed", color: "var(--chart-1)" },
};

/** A bar chart of tasks closed each month, with soft rounded bar tops. */
export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks closed</CardTitle>
        <CardDescription>May to October</CardDescription>
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
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="closed" fill="var(--chart-1)" radius={[6, 6, 2, 2]} maxBarSize={40} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-[0.8125rem]">
        <div className="font-medium text-foreground">Up 11% on September</div>
        <div className="text-muted-foreground">Tasks closed across every project, May to October</div>
      </CardFooter>
    </Card>
  );
}
