import { SleepData } from '@/classes/SleepLog';
import { getTimeFromTimestamp, prepareAnnotations, prepareSleepDatasets } from '@/utils/helpers';
import { Box } from '@mui/system';
import { Line } from 'react-chartjs-2';

const SleepLineChart = ({ sleepData }: { sleepData: SleepData[] }): JSX.Element => {
  const chartData = {
    datasets: prepareSleepDatasets(sleepData),
  }

  const annotations = prepareAnnotations(sleepData);

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Heart rates',
      },
      annotation: {
        annotations: {
          ...annotations
        }
      }
    },
    scales: {
      'y-axis-1': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      'x-axis-1': {
        type: 'linear' as const,
        display: true,
        position: 'bottom' as const,
        ticks: {
          callback: (value: any) => {
            const date = getTimeFromTimestamp(value);
            return date;
          }
        }
      },
    },
  };

  return (
    <Box>
      <Line 
        options={options}
        data={chartData}
      />
    </Box>
  )
}

export default SleepLineChart