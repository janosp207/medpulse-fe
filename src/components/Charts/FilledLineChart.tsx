import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

type Props = {
  datasets: any[]
  title: string
}

const FilledLineChart = ({ datasets, title }: Props): JSX.Element => {
  const chartData = {
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      'y-axis-1': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      'y-axis-2': {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
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