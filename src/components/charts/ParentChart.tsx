'use client';

import type { Children } from '@/utils/types/children';
import type { ChartConfig } from '@/components/ui/chart';

import { TrendingUp } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

type ParentChartProps = Children & {
  description: string;
  title: string;
  footerDescription?: React.ReactNode;
};

export type ChartProps = {
  chartConfig: ChartConfig;
  chartData: Record<string, string | number>[];
} & Omit<ParentChartProps, 'children'>;

export const chartDataColor = [
  'var(--color-chrome)',
  'var(--color-safari)',
  'var(--color-firefox)',
  'var(--color-edge)',
  'var(--color-other)',
];

const ParentChart = ({ children, ...rest }: ParentChartProps) => {
  return (
    <Card className="lg:1/2 mx-auto h-auto md:w-3/4">
      <CardHeader>
        <CardTitle className="capitalize">{rest.title}</CardTitle>
        <CardDescription>{rest.description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {rest.footerDescription}
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ParentChart;
