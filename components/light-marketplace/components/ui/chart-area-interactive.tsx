"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", desktop: 240, mobile: 166 },
  { date: "2024-04-02", desktop: 261, mobile: 169 },
  { date: "2024-04-03", desktop: 260, mobile: 172 },
  { date: "2024-04-04", desktop: 257, mobile: 166 },
  { date: "2024-04-05", desktop: 234, mobile: 171 },
  { date: "2024-04-06", desktop: 182, mobile: 188 },
  { date: "2024-04-07", desktop: 181, mobile: 196 },
  { date: "2024-04-08", desktop: 246, mobile: 166 },
  { date: "2024-04-09", desktop: 264, mobile: 173 },
  { date: "2024-04-10", desktop: 279, mobile: 180 },
  { date: "2024-04-11", desktop: 258, mobile: 175 },
  { date: "2024-04-12", desktop: 241, mobile: 180 },
  { date: "2024-04-13", desktop: 193, mobile: 194 },
  { date: "2024-04-14", desktop: 179, mobile: 197 },
  { date: "2024-04-15", desktop: 259, mobile: 164 },
  { date: "2024-04-16", desktop: 274, mobile: 170 },
  { date: "2024-04-17", desktop: 278, mobile: 179 },
  { date: "2024-04-18", desktop: 275, mobile: 179 },
  { date: "2024-04-19", desktop: 245, mobile: 188 },
  { date: "2024-04-20", desktop: 195, mobile: 206 },
  { date: "2024-04-21", desktop: 192, mobile: 208 },
  { date: "2024-04-22", desktop: 258, mobile: 169 },
  { date: "2024-04-23", desktop: 284, mobile: 171 },
  { date: "2024-04-24", desktop: 293, mobile: 177 },
  { date: "2024-04-25", desktop: 272, mobile: 176 },
  { date: "2024-04-26", desktop: 259, mobile: 188 },
  { date: "2024-04-27", desktop: 201, mobile: 210 },
  { date: "2024-04-28", desktop: 191, mobile: 218 },
  { date: "2024-04-29", desktop: 276, mobile: 179 },
  { date: "2024-04-30", desktop: 287, mobile: 180 },
  { date: "2024-05-01", desktop: 298, mobile: 182 },
  { date: "2024-05-02", desktop: 290, mobile: 177 },
  { date: "2024-05-03", desktop: 256, mobile: 185 },
  { date: "2024-05-04", desktop: 210, mobile: 206 },
  { date: "2024-05-05", desktop: 201, mobile: 217 },
  { date: "2024-05-06", desktop: 273, mobile: 183 },
  { date: "2024-05-07", desktop: 304, mobile: 188 },
  { date: "2024-05-08", desktop: 305, mobile: 193 },
  { date: "2024-05-09", desktop: 290, mobile: 186 },
  { date: "2024-05-10", desktop: 274, mobile: 190 },
  { date: "2024-05-11", desktop: 210, mobile: 207 },
  { date: "2024-05-12", desktop: 205, mobile: 214 },
  { date: "2024-05-13", desktop: 290, mobile: 180 },
  { date: "2024-05-14", desktop: 301, mobile: 188 },
  { date: "2024-05-15", desktop: 319, mobile: 197 },
  { date: "2024-05-16", desktop: 302, mobile: 195 },
  { date: "2024-05-17", desktop: 271, mobile: 202 },
  { date: "2024-05-18", desktop: 223, mobile: 218 },
  { date: "2024-05-19", desktop: 209, mobile: 220 },
  { date: "2024-05-20", desktop: 292, mobile: 180 },
  { date: "2024-05-21", desktop: 321, mobile: 184 },
  { date: "2024-05-22", desktop: 318, mobile: 194 },
  { date: "2024-05-23", desktop: 310, mobile: 194 },
  { date: "2024-05-24", desktop: 286, mobile: 206 },
  { date: "2024-05-25", desktop: 220, mobile: 228 },
  { date: "2024-05-26", desktop: 219, mobile: 233 },
  { date: "2024-05-27", desktop: 302, mobile: 189 },
  { date: "2024-05-28", desktop: 318, mobile: 190 },
  { date: "2024-05-29", desktop: 338, mobile: 194 },
  { date: "2024-05-30", desktop: 313, mobile: 191 },
  { date: "2024-05-31", desktop: 289, mobile: 202 },
  { date: "2024-06-01", desktop: 234, mobile: 227 },
  { date: "2024-06-02", desktop: 217, mobile: 238 },
  { date: "2024-06-03", desktop: 312, mobile: 198 },
  { date: "2024-06-04", desktop: 334, mobile: 201 },
  { date: "2024-06-05", desktop: 333, mobile: 203 },
  { date: "2024-06-06", desktop: 329, mobile: 196 },
  { date: "2024-06-07", desktop: 296, mobile: 202 },
  { date: "2024-06-08", desktop: 233, mobile: 223 },
  { date: "2024-06-09", desktop: 232, mobile: 233 },
  { date: "2024-06-10", desktop: 313, mobile: 197 },
  { date: "2024-06-11", desktop: 339, mobile: 205 },
  { date: "2024-06-12", desktop: 353, mobile: 213 },
  { date: "2024-06-13", desktop: 325, mobile: 207 },
  { date: "2024-06-14", desktop: 307, mobile: 212 },
  { date: "2024-06-15", desktop: 243, mobile: 229 },
  { date: "2024-06-16", desktop: 229, mobile: 233 },
  { date: "2024-06-17", desktop: 331, mobile: 194 },
  { date: "2024-06-18", desktop: 345, mobile: 201 },
  { date: "2024-06-19", desktop: 353, mobile: 212 },
  { date: "2024-06-20", desktop: 346, mobile: 212 },
  { date: "2024-06-21", desktop: 306, mobile: 222 },
  { date: "2024-06-22", desktop: 248, mobile: 242 },
  { date: "2024-06-23", desktop: 242, mobile: 244 },
  { date: "2024-06-24", desktop: 326, mobile: 198 },
  { date: "2024-06-25", desktop: 360, mobile: 201 },
  { date: "2024-06-26", desktop: 365, mobile: 208 },
  { date: "2024-06-27", desktop: 341, mobile: 208 },
  { date: "2024-06-28", desktop: 324, mobile: 221 },
  { date: "2024-06-29", desktop: 251, mobile: 247 },
  { date: "2024-06-30", desktop: 242, mobile: 256 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="whitespace-nowrap">Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <SelectTrigger
            className="hidden w-[10rem] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[15.625rem] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
