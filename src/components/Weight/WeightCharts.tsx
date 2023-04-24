import LimitValues from '@/classes/LimitValues'
import FilledLineChart from '@/components/Charts/FilledLineChart'
import { Box, Typography } from '@mui/material'
import LimitBox from '../LimitBox'

type Props = {
  datasets: any
  limitValues: LimitValues | undefined
}

const WeightCharts = ({ datasets, limitValues }: Props): JSX.Element => {
  const showLimitValues = limitValues !== undefined
  return(
    <Box sx={{ display: 'flex', flexDirection: 'row',  gap: 5 }}>
      <Box width={'50%'}>
        <FilledLineChart datasets={datasets.weightDataset} title={'Patient weight data'} thresholdMax={showLimitValues ? limitValues.weight : 0} thresholdMin={showLimitValues ? limitValues.weightMin : 0}/>
        <FilledLineChart datasets={datasets.fatRatioDataset} title={'Patient fat ratio data'} thresholdMax={showLimitValues ? limitValues.fatRatio : 0}/>
        <FilledLineChart datasets={datasets.bmiDataset} title={'Patient bmi data'} thresholdMax={showLimitValues ? limitValues.bmi : 0}/>
      </Box>
      <Box mt={5}>
        <Typography variant='h5' mb={3}>
          Threshold values
        </Typography>
        {
          limitValues &&
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <LimitBox title='Weight' limit={limitValues.weight} unit='kg'/>
            <LimitBox title='Body fat' limit={limitValues.fatRatio} unit='%'/>
            <LimitBox title='BMI' limit={limitValues.bmi}/>
          </Box>
        }
      </Box>
    </Box>
  )
}

export default WeightCharts