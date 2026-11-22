"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { Label, LabelList, RadialBar, RadialBarChart } from "recharts"

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
  type ChartConfig,
} from "./chart"

export const description = "A radial chart with a label"

/**
 * The label ink for each slice. The second slice is the warm ink in light
 * mode and pale in dark mode, so its label takes the page colour, which
 * flips the other way. Every other slice is a mid-light tone in both themes,
 * so its label takes the warm ink that stays dark in both (the warning
 * token's foreground).
 */
const INK_ON_INK_SLICE = "var(--background)"
const INK_ON_LIGHT_SLICE = "var(--warning-foreground)"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)", ink: INK_ON_LIGHT_SLICE },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)", ink: INK_ON_INK_SLICE },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)", ink: INK_ON_LIGHT_SLICE },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)", ink: INK_ON_LIGHT_SLICE },
  { browser: "other", visitors: 90, fill: "var(--color-other)", ink: INK_ON_LIGHT_SLICE },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

/** Draws one slice's label in the ink that reads on that slice's colour. */
function SliceLabel({ className, index, ...props }: React.ComponentProps<typeof Label>) {
  const ink = chartData[index ?? -1]?.ink ?? INK_ON_LIGHT_SLICE
  return (
    <Label
      {...props}
      index={index}
      content={undefined}
      className={["capitalize", className].filter(Boolean).join(" ")}
      fill={ink}
    />
  )
}

export function ChartRadialLabel() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[15.625rem]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="capitalize"
                fontSize={11}
                content={SliceLabel}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon icon="ph:trend-up" aria-hidden="true" className="size-4 text-(--primary-text)" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
