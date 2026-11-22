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

// Gauge Dark radar: a gold sweep over the polar grid.

const chartData = [
  { metric: "CPU", load: 186 },
  { metric: "Memory", load: 305 },
  { metric: "Disk", load: 237 },
  { metric: "Network", load: 273 },
  { metric: "IOPS", load: 209 },
  { metric: "GPU", load: 214 },
];

const chartConfig = {
  load: {
    label: "Load",
    color: "var(--chart-1)",
  },
};

export function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Resource Profile</CardTitle>
        <CardDescription>Average load across all machines</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[15.625rem]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="load"
              fill="var(--chart-1)"
              fillOpacity={0.3}
              stroke="var(--chart-1)"
              strokeWidth={1.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
