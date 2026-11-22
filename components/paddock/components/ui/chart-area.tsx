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

/** An area chart of tasks closed each month, filled in a soft wash of the first chart colour. */
export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks closed</CardTitle>
        <CardDescription>The last six months</CardDescription>
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
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="closed"
              type="monotone"
              fill="var(--chart-1)"
              fillOpacity={0.14}
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-[0.8125rem]">
        <div className="font-medium text-foreground">Up 11% on September</div>
        <div className="text-muted-foreground">Tasks closed across every project, May to October</div>
      </CardFooter>
    </Card>
  );
}
