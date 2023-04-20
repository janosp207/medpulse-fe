import { BloodPressureData } from '@/classes/LatestData';
import { prepareBloodPressureDatasets } from '@/utils/helpers';
import { Box } from '@mui/system';
import { Line } from 'react-chartjs-2';

type Props = {
  bloodPressureData: BloodPressureData[]
  hypotension?: {systolic: number, diastolic: number}
  hypertension?: {systolic: number, diastolic: number}
}

const BloodPressureChart = ({ bloodPressureData, hypotension, hypertension }: Props): JSX.Element => {
  const chartData = {
    datasets: prepareBloodPressureDatasets(bloodPressureData),
  }

  const annotations = {
    hypertension: {},
    hypotension: {},
  }

  if(hypotension) {
    annotations.hypotension = {
      type: 'box' as const,
      mode: 'horizontal' as const,
      scaleID: 'y-axis-1',
      yMin: hypotension.systolic,
      yMax: hypotension.diastolic,
      borderColor: 'rgb(30, 30, 255, 0.2)',
      backgroundColor: 'rgb(30, 30, 255, 0.2)',
      borderWidth: 2,
    }
  }

  if(hypertension) {
    annotations.hypertension = {
      type: 'box' as const,
      mode: 'horizontal' as const,
      scaleID: 'y-axis-1',
      yMin: hypertension.systolic,
      yMax: hypertension.diastolic,
      borderColor: 'rgb(255, 30, 30, 0.2)',
      backgroundColor: 'rgb(255, 30, 30, 0.2)',
      borderWidth: 2,
    }
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