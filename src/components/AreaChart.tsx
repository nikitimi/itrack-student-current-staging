'use client';

import { TrendingUp } from 'lucide-react';
import { BarChart, CartesianGrid, XAxis, Bar } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartData } from '@/utils/types/chartData';
import { studentInfoSpecialization } from '@/redux/reducers/studentInfoReducer';
import { useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';

export const description = 'An area chart with axes';

type AreaChartProps = { chartConfig: ChartConfig; chartData: ChartData[] };

export default function AreaChart(props: AreaChartProps) {
  const { chartConfig, chartData } = props;
  const specialization = studentInfoSpecialization(
    useAppSelector((s) => s.studentInfo)
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(true), []);

  if (!isLoaded) {
    console.log('Redux state is not currently loaded.');
    return <></>;
  }

  return (
    <Card className="lg:1/2 mx-auto h-auto md:w-3/4">
      <CardHeader>
        <CardTitle>Area Chart - Careers</CardTitle>
        <CardDescription>
          Showing careers related to the student performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            className="capitalize"
            data={chartData}
            // margin={{
            //   left: -20,
            //   right: 12,
            // }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="job"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            {/* <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              radius={4} // Bar Props
              dataKey="certificate"
              fill="var(--color-certificate)"
              // type="natural"
              // fillOpacity={0.4}
              // stroke="var(--color-certificate)"
              // stackId="a"
            />
            <Bar
              radius={4} // Bar Props
              dataKey="grades"
              fill="var(--color-grades)"
              // type="natural"
              // fillOpacity={0.4}
              // stroke="var(--color-grades)"
              // stackId="a"
            />
            <Bar
              radius={4} // Bar Props
              dataKey="internship"
              fill="var(--color-internship)"
              // type="natural"
              // fillOpacity={0.4}
              // stroke="var(--color-internship)"
              // stackId="a"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              <p className="flex gap-1 capitalize">
                {specialization.replace(/_/, ' ').toLocaleLowerCase()}
                <span>career chart</span>
              </p>

              <TrendingUp className="h-4 w-4" />
            </div>
            {/* <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Jobs ---- Jobs
            </div> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
