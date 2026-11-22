"use client"

import { Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"

const chartData = [
  { channel: "direct", visitors: 275, fill: "var(--chart-1)" },
  { channel: "search", visitors: 200, fill: "var(--chart-2)" },
  { channel: "referral", visitors: 187, fill: "var(--chart-3)" },
  { channel: "email", visitors: 173, fill: "var(--chart-4)" },
  { channel: "other", visitors: 90, fill: "var(--chart-5)" },
]

const chartConfig = {
  visitors: { label: "Visitors" },
  direct: { label: "Direct", color: "var(--chart-1)" },
  search: { label: "Search", color: "var(--chart-2)" },
  referral: { label: "Referral", color: "var(--chart-3)" },
  email: { label: "Email", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

/** Mallow donut chart: five channels split by thin card-coloured gaps. */
export function ChartPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Visitors by channel</CardTitle>
        <CardDescription>January to June</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="channel"
              innerRadius={64}
              strokeWidth={3}
              paddingAngle={1}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <span className="text-sm text-muted-foreground">Total visitors</span>
        <span className="text-2xl font-medium tabular-nums">925</span>
      </CardFooter>
    </Card>
  )
}
