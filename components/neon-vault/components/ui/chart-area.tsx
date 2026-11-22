"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"

// Neon Vault area chart: portfolio value glowing magenta over the vault card.

const chartData = [
  { month: "January", balance: 186 },
  { month: "February", balance: 305 },
  { month: "March", balance: 237 },
  { month: "April", balance: 73 },
  { month: "May", balance: 209 },
  { month: "June", balance: 214 },
]

const chartConfig = {
  balance: {
    label: "Balance",
    color: "var(--chart-1)",
  },
}

export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>Portfolio value over the last 6 months</CardDescription>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="balance"
              type="natural"
              fill="var(--chart-1)"
              fillOpacity={0.35}
              stroke="var(--chart-1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">Trending up by 5.2% this month</div>
        <div className="leading-none text-muted-foreground">January - June 2024</div>
      </CardFooter>
    </Card>
  )
}
