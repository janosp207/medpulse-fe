import FilledLineChart from '@/components/Charts/FilledLineChart'

const WeightCharts = ({ datasets }: { datasets: any}): JSX.Element => {
  return(
    <FilledLineChart datasets={datasets} title={'Patient weight data'}/>
  )
}

export default WeightCharts