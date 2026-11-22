"use client"

import { Pie, PieChart } from "recharts"

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

// Neon Vault donut: portfolio allocation in the wallet palette of magenta,
// lavender, gold, cyan and mint.

const chartData = [
  { asset: "bitcoin", share: 275, fill: "var(--chart-1)" },
  { asset: "ethereum", share: 200, fill: "var(--chart-2)" },
  { asset: "solana", share: 187, fill: "var(--chart-3)" },
  { asset: "stablecoins", share: 173, fill: "var(--chart-4)" },
  { asset: "other", share: 90, fill: "var(--chart-5)" },
]

const chartConfig = {
  share: { label: "Share" },
  bitcoin: { label: "Bitcoin", color: "var(--chart-1)" },
  ethereum: { label: "Ethereum", color: "var(--chart-2)" },
  solana: { label: "Solana", color: "var(--chart-3)" },
  stablecoins: { label: "Stablecoins", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[15.625rem]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="share" nameKey="asset" innerRadius={60} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none font-medium">Trending up by 5.2% this month</div>
        <div className="leading-none text-muted-foreground">Portfolio allocation across assets</div>
      </CardFooter>
    </Card>
  )
}
