"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

const chartData = [
  { kind: "notes", items: 412, fill: "var(--chart-1)" },
  { kind: "tasks", items: 268, fill: "var(--chart-2)" },
  { kind: "files", items: 154, fill: "var(--chart-3)" },
  { kind: "events", items: 97, fill: "var(--chart-4)" },
  { kind: "other", items: 41, fill: "var(--chart-5)" },
];

const chartConfig = {
  items: { label: "Items" },
  notes: { label: "Notes", color: "var(--chart-1)" },
  tasks: { label: "Tasks", color: "var(--chart-2)" },
  files: { label: "Files", color: "var(--chart-3)" },
  events: { label: "Events", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
};

const total = chartData.reduce((sum, row) => sum + row.items, 0);

/** A donut on a paper card: what the workspace holds, with the total in the middle. */
export function ChartPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle>Workspace contents</CardTitle>
        <CardDescription>Everything saved so far</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="items"
              nameKey="kind"
              innerRadius={62}
              paddingAngle={2}
              cornerRadius={4}
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xl font-semibold">
                        {total.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-xs">
                        items
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm">
        <div className="font-medium leading-snug">Notes make up 42% of the workspace</div>
        <div className="leading-snug text-muted-foreground">Archived items are left out</div>
      </CardFooter>
    </Card>
  );
}
