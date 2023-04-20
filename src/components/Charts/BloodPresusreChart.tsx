import { BloodPressureData } from '@/classes/LatestData';
import { prepareBloodPressureDatasets } from '@/utils/helpers';
import { Box } from '@mui/system';
import { Line } from 'react-chartjs-2';

const BloodPressureChart = ({ bloodPressureData }: { bloodPressureData: BloodPressureData[] }): JSX.Element => {
  const chartData = {
    datasets: prepareBloodPressureDatasets(bloodPressureData),
  }

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
        options={options}
        data={chartData}
      />
    </Box>
  )
}

export default BloodPressureChart