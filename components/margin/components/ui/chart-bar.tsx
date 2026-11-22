"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

const chartData = [
  { day: "Monday", notes: 12 },
  { day: "Tuesday", notes: 19 },
  { day: "Wednesday", notes: 15 },
  { day: "Thursday", notes: 22 },
  { day: "Friday", notes: 17 },
  { day: "Saturday", notes: 6 },
  { day: "Sunday", notes: 4 },
];

const chartConfig = {
  notes: { label: "Notes", color: "var(--chart-1)" },
};

/** A bar chart on a paper card: notes created each weekday, with softly rounded tops. */
export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes this week</CardTitle>
        <CardDescription>New notes by day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator />} />
            <Bar dataKey="notes" fill="var(--chart-1)" radius={[6, 6, 2, 2]} maxBarSize={36} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="font-medium leading-snug">Thursday was the busiest day</div>
        <div className="leading-snug text-muted-foreground">95 notes in seven days</div>
      </CardFooter>
    </Card>
  );
}
