"use client"

import { RadialBar, RadialBarChart } from "recharts"

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

/** Mallow radial chart: rounded rings on recessed tracks, one per channel. */
export function ChartRadialDefault() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Visitors by channel</CardTitle>
        <CardDescription>January to June</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="channel" />} />
            <RadialBar dataKey="visitors" background cornerRadius={6} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <span className="text-sm text-muted-foreground">Largest channel</span>
        <span className="text-2xl font-medium tabular-nums">Direct, 275</span>
      </CardFooter>
    </Card>
  )
}
