"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"

const chartData = [
  { month: "January", uptime: 186 },
  { month: "February", uptime: 305 },
  { month: "March", uptime: 237 },
  { month: "April", uptime: 273 },
  { month: "May", uptime: 209 },
  { month: "June", uptime: 214 },
]

const chartConfig = {
  uptime: { label: "Hours online", color: "var(--chart-1)" },
}

/** Mallow radar chart: a faint violet shape over a hairline polar grid. */
export function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hours online</CardTitle>
        <CardDescription>January to June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
            <PolarGrid />
            <Radar
              dataKey="uptime"
              fill="var(--chart-1)"
              fillOpacity={0.2}
              stroke="var(--chart-1)"
              strokeWidth={1.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <span className="text-sm text-muted-foreground">Monthly average</span>
        <span className="text-2xl font-medium tabular-nums">237 h</span>
      </CardFooter>
    </Card>
  )
}
