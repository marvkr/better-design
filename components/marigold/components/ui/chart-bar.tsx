"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

// Talentboard bar chart: rounded orange bars over hairline grid.

const chartData = [
  { month: "January", invoices: 186 },
  { month: "February", invoices: 305 },
  { month: "March", invoices: 237 },
  { month: "April", invoices: 173 },
  { month: "May", invoices: 209 },
  { month: "June", invoices: 264 },
];

const chartConfig = {
  invoices: {
    label: "Invoices",
    color: "var(--chart-1)",
  },
};

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>Invoices issued, last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="invoices" fill="var(--color-invoices)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">Steady issuing volume</div>
      </CardFooter>
    </Card>
  );
}
