'use client';

import AreaChart from '@/components/AreaChart';
import AuthenticationHelper from '@/components/AuthenticationHelper';
import Header from '@/components/Header';
import { useAppSelector } from '@/hooks/redux';
import { studentInfoChartData } from '@/redux/reducers/studentInfoReducer';

const Dashboard = () => {
  const chartData = studentInfoChartData(useAppSelector((s) => s.studentInfo));

  const chartConfig = {
    certificate: {
      label: 'Certificate',
      color: 'hsl(var(--chart-1))',
    },
    grades: {
      label: 'Grades',
      color: 'hsl(var(--chart-2))',
    },
    internship: {
      label: 'Internship',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 py-4">
        <AuthenticationHelper />
        <AreaChart chartData={chartData} chartConfig={chartConfig} />
      </div>
    </>
  );
};

export default Dashboard;
