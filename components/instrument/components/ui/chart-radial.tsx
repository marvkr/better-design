"use client";

import { RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

// Gauge Dark radial: literal gauge arcs in the warm instrument palette.

const chartData = [
  { region: "iad", machines: 275, fill: "var(--chart-1)" },
  { region: "lhr", machines: 200, fill: "var(--chart-2)" },
  { region: "fra", machines: 187, fill: "var(--chart-3)" },
  { region: "syd", machines: 173, fill: "var(--chart-4)" },
  { region: "other", machines: 90, fill: "var(--chart-5)" },
];

const chartConfig = {
  machines: { label: "Machines" },
  iad: { label: "Ashburn", color: "var(--chart-1)" },
  lhr: { label: "London", color: "var(--chart-2)" },
  fra: { label: "Frankfurt", color: "var(--chart-3)" },
  syd: { label: "Sydney", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
};

export function ChartRadialDefault() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Capacity by Region</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[15.625rem]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="region" />}
            />
            <RadialBar dataKey="machines" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month
        </div>
        <div className="leading-none text-muted-foreground">
          Provisioned machines per region
        </div>
      </CardFooter>
    </Card>
  );
}
