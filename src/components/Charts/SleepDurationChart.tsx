import SleepLog from '@/classes/SleepLog'
import { prepareSleepDurationChart, turnDurationToHoursAndMinutes } from '@/utils/helpers'
import { Line } from 'react-chartjs-2'

type Props = {
  sleepLogs: SleepLog[]
}

const SleepDurationChart = ({ sleepLogs }: Props): JSX.Element => {
  const chartData = {
    datasets: prepareSleepDurationChart(sleepLogs)
  }
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (value: any) {
            return value[0].raw.x
          },
          label: function (context: any) {
            const { hours, minutes } = turnDurationToHoursAndMinutes(context.raw.y)
            return `${hours} h ${minutes} min`
          }
        }
      },
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Blood oxygen',
      },
    },
    scales: {
      'y-axis-1': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: {
          callback: (value: any) => {
            const { hours, minutes } = turnDurationToHoursAndMinutes(value)
            return `${hours} h ${minutes} min`
          }
        }
      },
    },
  }
  return (
    <>
      <Line data={chartData} options={options}/>
    </>
  )
}

export default SleepDurationChart