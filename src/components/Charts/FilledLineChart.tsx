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