"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"

const chartData = [
  { month: "January", settled: 186 },
  { month: "February", settled: 305 },
  { month: "March", settled: 237 },
  { month: "April", settled: 73 },
  { month: "May", settled: 209 },
  { month: "June", settled: 214 },
]

const chartConfig = {
  settled: { label: "Settled", color: "var(--chart-1)" },
}

/** Mallow area chart: one violet series over faint grid lines, inside a card. */
export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settled transfers</CardTitle>
        <CardDescription>January to June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="settled"
              type="monotone"
              fill="var(--chart-1)"
              fillOpacity={0.12}
              stroke="var(--chart-1)"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <span className="text-sm text-muted-foreground">Total this half</span>
        <span className="text-2xl font-medium tabular-nums">1,224</span>
      </CardFooter>
    </Card>
  )
}
