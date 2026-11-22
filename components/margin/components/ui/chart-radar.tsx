"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

const chartData = [
  { area: "Writing", hours: 18 },
  { area: "Planning", hours: 12 },
  { area: "Review", hours: 9 },
  { area: "Research", hours: 14 },
  { area: "Meetings", hours: 7 },
  { area: "Admin", hours: 5 },
];

const chartConfig = {
  hours: { label: "Hours", color: "var(--chart-1)" },
};

/** A radar chart on a paper card: where the week's hours went, by kind of work. */
export function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader className="items-center pb-2 text-center">
        <CardTitle>Time by area</CardTitle>
        <CardDescription>Hours logged in notes this week</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="area" />
            <PolarGrid />
            <Radar
              dataKey="hours"
              fill="var(--chart-1)"
              fillOpacity={0.18}
              stroke="var(--chart-1)"
              strokeWidth={1.75}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm">
        <div className="font-medium leading-snug">Writing took the most time</div>
        <div className="leading-snug text-muted-foreground">65 hours in total</div>
      </CardFooter>
    </Card>
  );
}
