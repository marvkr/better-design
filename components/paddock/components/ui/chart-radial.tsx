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

const chartData = [
  { stage: "todo", projects: 4, fill: "var(--chart-5)" },
  { stage: "progress", projects: 3, fill: "var(--chart-1)" },
  { stage: "review", projects: 2, fill: "var(--chart-4)" },
  { stage: "done", projects: 3, fill: "var(--chart-3)" },
];

const chartConfig = {
  projects: { label: "Projects" },
  todo: { label: "To do", color: "var(--chart-5)" },
  progress: { label: "In progress", color: "var(--chart-1)" },
  review: { label: "In review", color: "var(--chart-4)" },
  done: { label: "Done", color: "var(--chart-3)" },
};

/** A radial bar chart of projects by stage, each ring on a grey track. */
export function ChartRadialDefault() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Projects by stage</CardTitle>
        <CardDescription>12 projects this quarter</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <RadialBarChart data={chartData} innerRadius={36} outerRadius={110} barSize={12}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="stage" />} />
            <RadialBar dataKey="projects" background cornerRadius={6} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-[0.8125rem]">
        <div className="font-medium text-foreground">4 projects still to start</div>
        <div className="text-muted-foreground">Counted across every stage</div>
      </CardFooter>
    </Card>
  );
}
