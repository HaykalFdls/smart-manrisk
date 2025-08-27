'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', risk: 186 },
  { month: 'February', risk: 305 },
  { month: 'March', risk: 237 },
  { month: 'April', risk: 173 },
  { month: 'May', risk: 209 },
  { month: 'June', risk: 214 },
];

const chartConfig = {
  risk: {
    label: 'Risk Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function RiskChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Trend Analysis</CardTitle>
        <CardDescription>Monthly aggregated risk scores</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="risk" fill="var(--color-risk)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
