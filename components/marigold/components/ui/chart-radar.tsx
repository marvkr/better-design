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

// Talentboard radar: orange footprint on the polar hairline grid.

const chartData = [
  { metric: "Billing", score: 186 },
  { metric: "Quoting", score: 305 },
  { metric: "Invoicing", score: 237 },
  { metric: "Coupons", score: 203 },
  { metric: "Reports", score: 209 },
  { metric: "Events", score: 264 },
];

const chartConfig = {
  score: {
    label: "Usage",
    color: "var(--chart-1)",
  },
};

export function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart</CardTitle>
        <CardDescription>Feature usage across modules</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[15.625rem]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.4}
              stroke="var(--color-score)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="text-muted-foreground">Quoting is the busiest module</div>
      </CardFooter>
    </Card>
  );
}
