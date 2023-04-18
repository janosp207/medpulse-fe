import { SleepData } from '@/classes/SleepLog';
import { getTimeFromTimestamp, prepareSleepDatasets } from '@/utils/helpers';
import { Box } from '@mui/system';
import { Line } from 'react-chartjs-2';

const SleepLineChart = ({ sleepData }: { sleepData: SleepData[] }): JSX.Element => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'title',
      },
      annotation: {
        annotations: {
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

  const chartData = {
    datasets: prepareSleepDatasets(sleepData),
  }

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