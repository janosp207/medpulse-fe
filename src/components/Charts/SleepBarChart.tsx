import { SleepData } from '@/classes/SleepLog';
import { prepareSleepDatasets } from '@/utils/helpers';
import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const SleepBarChart = ({ sleepData }: { sleepData: SleepData[] }): JSX.Element => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    scales: {
      'y-axis-1': {
        ticks: {
          callback: (value: number) => {
            switch(value) {
              case 0:
                return 'Awake';
              case 1:
                return 'Light';
              case 2:
                return 'Deep';
              case 3:
                return 'REM';
              default:
                return value;
            }
          }
        },
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      'x-axis-1': {
        display: true,
        //type for a bar chart is 'category'
        type: 'category' as const,
        position: 'bottom' as const,
      }
    }
  };

  const chartData = prepareSleepDatasets(sleepData);

  return (
    <Box>
      <Bar 
        options={options}
        data={chartData}
      />
    </Box>
  )
}

export default SleepBarChart