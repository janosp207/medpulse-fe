import LimitValues from '@/classes/LimitValues'
import FilledLineChart from '@/components/Charts/FilledLineChart'
import { Box, Typography } from '@mui/material'
import LimitBox from '../LimitBox'

type Props = {
  datasets: any[]
  limitValues: LimitValues
}

const WeightCharts = ({ datasets, limitValues }: Props): JSX.Element => {
  return(
    <Box sx={{ display: 'flex', flexDirection: 'row',  gap: 5 }}>
      <FilledLineChart datasets={datasets} title={'Patient weight data'}/>
      <Box mt={5}>
        <Typography variant='h5' mb={3}>
          Threshold values
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <LimitBox title='Weight' limit={limitValues.weight} unit='kg'/>
          <LimitBox title='Body fat' limit={limitValues.fatRatio} unit='%'/>
          <LimitBox title='BMI' limit={limitValues.bmi}/>
        </Box>
      </Box>
    </Box>
  )
}

export default WeightCharts