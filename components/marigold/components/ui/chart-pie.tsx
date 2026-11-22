"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";

// Talentboard donut: revenue mix in the orange-amber-teal palette.

const chartData = [
  { plan: "b2c", revenue: 415, fill: "var(--color-b2c)" },
  { plan: "b2b", revenue: 312, fill: "var(--color-b2b)" },
  { plan: "usage", revenue: 187, fill: "var(--color-usage)" },
  { plan: "addons", revenue: 96, fill: "var(--color-addons)" },
  { plan: "other", revenue: 54, fill: "var(--color-other)" },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
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

export function ChartPieDonut() {
  const totalRevenue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.revenue, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>Revenue mix by plan</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[15.625rem]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="plan"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-semibold"
                        >
                          {totalRevenue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-[color:var(--muted-foreground)]"
                        >
                          EUR / mo
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground">B2C still leads the mix</div>
      </CardFooter>
    </Card>
  );
}
