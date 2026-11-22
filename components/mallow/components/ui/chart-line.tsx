"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"

const chartData = [
  { month: "January", balance: 186 },
  { month: "February", balance: 305 },
  { month: "March", balance: 237 },
  { month: "April", balance: 73 },
  { month: "May", balance: 209 },
  { month: "June", balance: 214 },
]

const chartConfig = {
  balance: { label: "Balance", color: "var(--chart-1)" },
}

/** Mallow line chart: one thin violet line with no dots until hover. */
export function ChartLineDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account balance</CardTitle>
        <CardDescription>January to June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="balance"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <span className="text-sm text-muted-foreground">End of June</span>
        <span className="text-2xl font-medium tabular-nums">214.00</span>
      </CardFooter>
    </Card>
  )
}
