import { Box } from '@mui/material';
import 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';

type Props = {
  datasets: any[]
  title: string
  thresholdMax?: number
  thresholdMin?: number
}

const FilledLineChart = ({ datasets, title, thresholdMax, thresholdMin, }: Props): JSX.Element => {
  const chartData = {
    datasets
  };

  const annotations = {
    annotations: {
      line1: undefined as any,
      line2: undefined as any,
    }
  }

  if (thresholdMax) {
    annotations.annotations.line1 = {
      type: 'line' as const,
      mode: 'horizontal' as const,
      scaleID: 'y-axis-1',
      value: thresholdMax,
      borderColor: '#000',
      borderWidth: 2,
    }
  }

  if (thresholdMin) { 
    annotations.annotations.line2 = {
      type: 'line' as const,
      mode: 'horizontal' as const,
      scaleID: 'y-axis-1',
      value: thresholdMin,
      borderColor: '#000',
      borderWidth: 2,
    }
  }

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
        ...annotations
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