"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"

const chartData = [
  { month: "January", orders: 186 },
  { month: "February", orders: 305 },
  { month: "March", orders: 237 },
  { month: "April", orders: 73 },
  { month: "May", orders: 209 },
  { month: "June", orders: 214 },
]

const chartConfig = {
  orders: { label: "Orders", color: "var(--chart-1)" },
}

/** Mallow bar chart: rounded violet bars with a soft hover column. */
export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>January to June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="orders" fill="var(--chart-1)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <span className="text-sm text-muted-foreground">Busiest month</span>
        <span className="text-2xl font-medium tabular-nums">February, 305</span>
      </CardFooter>
    </Card>
  )
}
