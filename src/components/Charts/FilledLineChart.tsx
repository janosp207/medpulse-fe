import { Box } from '@mui/material';
import 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';

type Props = {
  datasets: any[]
  title: string
  threshold?: number
}

const FilledLineChart = ({ datasets, title, threshold }: Props): JSX.Element => {
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
      annotation: {
        annotations: {
          line1: {
            type: 'line' as const,
            mode: 'horizontal' as const,
            scaleID: 'y-axis-1',
            value: threshold,
            borderColor: '#000',
            borderWidth: 2,
          },
        }
      }
    },
    scales: {
      'y-axis-1': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
    },
  };

  return (
    <Box>
      <Line
        data={chartData}
        options={options}
      />
    </Box>
  );
};

export default FilledLineChart;