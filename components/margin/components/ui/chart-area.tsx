"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

const chartData = [
  { month: "May", edits: 142 },
  { month: "June", edits: 198 },
  { month: "July", edits: 176 },
  { month: "August", edits: 121 },
  { month: "September", edits: 234 },
  { month: "October", edits: 268 },
];

const chartConfig = {
  edits: { label: "Edits", color: "var(--chart-1)" },
};

/** An area chart on a paper card: notebook edits over six months, in the action oxblood. */
export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edits per month</CardTitle>
        <CardDescription>Every change saved across your notebooks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 8, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="margin-area-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.22} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="edits"
              type="monotone"
              fill="url(#margin-area-fill)"
              stroke="var(--chart-1)"
              strokeWidth={1.75}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="font-medium leading-snug">Up 14% on September</div>
        <div className="leading-snug text-muted-foreground">May to October</div>
      </CardFooter>
    </Card>
  );
}
