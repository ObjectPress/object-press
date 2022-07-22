import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import Chart from 'react-apexcharts';
import { barChartData, barChartOptions } from '@/variables/charts';

export default function BarChart() {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setChartData(barChartData);
    setChartOptions(barChartOptions);
    setLoading(false);
  }, [chartData, chartOptions]);

  return (
    <Card
      py="1rem"
      height={{ sm: '70vh', md: '50vh' }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      {!loading && (
        <Chart
          options={chartOptions}
          series={chartData}
          type="bar"
          width="100%"
          height="100%"
        />
      )}
    </Card>
  );
}
