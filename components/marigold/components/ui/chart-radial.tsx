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

// Talentboard radial: plan distribution rings in the DS palette.

const chartData = [
  { plan: "b2c", customers: 275, fill: "var(--color-b2c)" },
  { plan: "b2b", customers: 200, fill: "var(--color-b2b)" },
  { plan: "usage", customers: 187, fill: "var(--color-usage)" },
  { plan: "addons", customers: 173, fill: "var(--color-addons)" },
  { plan: "other", customers: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  customers: {
    label: "Customers",
  },
  b2c: {
    label: "B2C Plan",
    color: "var(--chart-1)",
  },
  b2b: {
    label: "B2B Plan",
    color: "var(--chart-2)",
  },
  usage: {
    label: "Usage",
    color: "var(--chart-3)",
  },
  addons: {
    label: "Add-ons",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
};

export function ChartRadialDefault() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart</CardTitle>
        <CardDescription>Customers by plan</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[15.625rem]">
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="plan" />} />
            <RadialBar dataKey="customers" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground">B2C remains the largest cohort</div>
      </CardFooter>
    </Card>
  );
}
