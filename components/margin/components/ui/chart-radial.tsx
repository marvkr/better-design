"use client";

import { RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

const chartData = [
  { notebook: "other", pages: 38, fill: "var(--chart-5)" },
  { notebook: "travel", pages: 64, fill: "var(--chart-4)" },
  { notebook: "reading", pages: 92, fill: "var(--chart-3)" },
  { notebook: "personal", pages: 131, fill: "var(--chart-2)" },
  { notebook: "work", pages: 186, fill: "var(--chart-1)" },
];

const chartConfig = {
  pages: { label: "Pages" },
  work: { label: "Work", color: "var(--chart-1)" },
  personal: { label: "Personal", color: "var(--chart-2)" },
  reading: { label: "Reading", color: "var(--chart-3)" },
  travel: { label: "Travel", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
};

/** A radial bar chart on a paper card: pages per notebook, each ring on a grey track. */
export function ChartRadialDefault() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle>Pages by notebook</CardTitle>
        <CardDescription>All notebooks you own</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110} barSize={10}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="notebook" />} />
            <RadialBar dataKey="pages" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm">
        <div className="font-medium leading-snug">Work holds the most pages</div>
        <div className="leading-snug text-muted-foreground">511 pages across 5 notebooks</div>
      </CardFooter>
    </Card>
  );
}
