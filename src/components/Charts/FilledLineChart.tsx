import { formatDate } from '@/utils/helpers';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

type Props = {
  data: any
  label: string
  unit: string
}

const FilledLineChart = ({ data, label, unit }: Props): JSX.Element => {
  const chartData = {
    labels: data.map((d: any) => formatDate(d.date)),
    datasets: [
      {
        label: `${label} (${unit})`,
        data: data.map((d: any) => d.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <Box width={'50%'}>
      <Line
        data={chartData}
        options={options}
      />
    </Box>
  );
};

export default FilledLineChart;