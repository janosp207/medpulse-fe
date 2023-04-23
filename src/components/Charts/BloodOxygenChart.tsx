import { BloodOxygenData } from '@/classes/LatestData';
import { prepareBloodOxygenDatasets } from '@/utils/helpers';
import { Box } from '@mui/material';
import 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';

type Props = {
  bloodOxygenData: BloodOxygenData[]
  threshold?: number
}

const BloodOxygenChart = ({ bloodOxygenData, threshold = 0 }: Props): JSX.Element => {
  
  const chartData = {
    datasets: prepareBloodOxygenDatasets(bloodOxygenData, threshold),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Blood oxygen',
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
    <Box width={'60%'}>
      <Line
        data={chartData}
        options={options}
      />
    </Box>
  );
};

export default BloodOxygenChart;