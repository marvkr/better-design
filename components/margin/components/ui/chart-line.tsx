"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

const chartData = [
  { month: "May", open: 38, done: 24 },
  { month: "June", open: 44, done: 31 },
  { month: "July", open: 41, done: 36 },
  { month: "August", open: 29, done: 33 },
  { month: "September", open: 35, done: 40 },
  { month: "October", open: 27, done: 46 },
];

const chartConfig = {
  open: { label: "Open tasks", color: "var(--chart-1)" },
  done: { label: "Done", color: "var(--chart-3)" },
};

/** A two-series line chart on a paper card: open tasks against finished ones. */
export function ChartLineDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks over time</CardTitle>
        <CardDescription>May to October</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ left: 8, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="open" type="monotone" stroke="var(--chart-1)" strokeWidth={1.75} dot={false} />
            <Line dataKey="done" type="monotone" stroke="var(--chart-3)" strokeWidth={1.75} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="font-medium leading-snug">Finished tasks passed open ones in August</div>
        <div className="leading-snug text-muted-foreground">Counted at the end of each month</div>
      </CardFooter>
    </Card>
  );
}
