"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart"

export const description = "An interactive line chart"

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
  views: {
    label: "Page Views",
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

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="whitespace-nowrap">Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[15.625rem] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
              content={
                <ChartTooltipContent
                  className="w-[9.375rem]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
