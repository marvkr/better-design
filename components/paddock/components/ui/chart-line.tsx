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

/** A line chart of tasks closed each month, drawn as one stroke in the first chart colour. */
export function ChartLineDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks closed</CardTitle>
        <CardDescription>May to October</CardDescription>
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
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="closed"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--card)", strokeWidth: 2, stroke: "var(--chart-1)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-[0.8125rem]">
        <div className="font-medium text-foreground">Up 11% on September</div>
        <div className="text-muted-foreground">Tasks closed across every project, May to October</div>
      </CardFooter>
    </Card>
  );
}
