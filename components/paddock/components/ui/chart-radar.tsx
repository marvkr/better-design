"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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

/** A radar chart of tasks closed each month, filled in a pale wash of the first chart colour. */
export function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Tasks closed</CardTitle>
        <CardDescription>The last six months</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" tickFormatter={(value: string) => value.slice(0, 3)} />
            <PolarGrid />
            <Radar
              dataKey="closed"
              fill="var(--chart-1)"
              fillOpacity={0.18}
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-[0.8125rem]">
        <div className="font-medium text-foreground">Up 11% on September</div>
        <div className="text-muted-foreground">May to October</div>
      </CardFooter>
    </Card>
  );
}
