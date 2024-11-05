'use client';

import { BarChart as BChart, CartesianGrid, XAxis, Bar } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import ParentChart, { type ChartProps } from './ParentChart';
import useChartDataKeys from '@/hooks/useChartDataKeys';

export const description = 'An bar chart with careers';

export default function BarChart(props: ChartProps) {
  const { chartConfig, chartData, ...rest } = props;
  const chartKeys = useChartDataKeys(chartData);

  return (
    <ParentChart {...rest}>
      <ChartContainer config={chartConfig}>
        <BChart accessibilityLayer className="capitalize" data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={chartKeys?.[0]}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          {chartKeys?.splice(1).map((key) => {
            return (
              <Bar
                key={key}
                radius={4}
                dataKey={key}
                fill={`var(--color-${key})`}
              />
            );
          })}
        </BChart>
      </ChartContainer>
    </ParentChart>
  );
}