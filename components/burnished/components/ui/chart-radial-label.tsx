"use client"

import { Icon } from "@iconify/react"
import {
  Label,
  LabelList,
  RadialBar,
  RadialBarChart,
  type LabelProps,
} from "recharts"

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

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
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

// The four copper slices are light enough in the dark theme to carry the
// page's umber ink, and mid-tone enough in the light theme to carry cream.
// The warm grey slice is too dim for umber, so it takes the foreground.
const LABEL_TONE: { [browser: string]: string } = {
  other: "fill-foreground",
}

function BarLabel({ index = 0, ...props }: LabelProps) {
  const browser = chartData[index]?.browser ?? ""
  return (
    <Label
      {...props}
      content={undefined}
      className={`capitalize font-medium ${LABEL_TONE[browser] ?? "fill-primary-foreground"}`}
    />
  )
}

/**
 * Burnished radial chart with labels: five copper rings on recessed muted
 * tracks, each named at its start.
 */
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
            <RadialBar dataKey="visitors" background cornerRadius={8}>
              <LabelList
                position="insideStart"
                dataKey="browser"
                content={<BarLabel />}
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-semibold">
          Trending up by 5.2% this month{" "}
          <Icon icon="ph:trend-up" aria-hidden="true" className="size-4 text-primary-text" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
