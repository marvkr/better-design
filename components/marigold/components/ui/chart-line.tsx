"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

// Talentboard line chart: orange lead line with amber counterpoint.

const chartData = [
  { month: "January", arr: 4980, mrr: 415 },
  { month: "February", arr: 5210, mrr: 434 },
  { month: "March", arr: 5460, mrr: 455 },
  { month: "April", arr: 5740, mrr: 478 },
  { month: "May", arr: 6080, mrr: 506 },
  { month: "June", arr: 6420, mrr: 535 },
];

const chartConfig = {
  arr: {
    label: "ARR",
    color: "var(--chart-1)",
  },
  mrr: {
    label: "MRR",
    color: "var(--chart-2)",
  },
};

export function ChartLineDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>ARR and MRR, last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="arr"
              type="monotone"
              stroke="var(--color-arr)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mrr"
              type="monotone"
              stroke="var(--color-mrr)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">Compounding growth</div>
      </CardFooter>
    </Card>
  );
}
