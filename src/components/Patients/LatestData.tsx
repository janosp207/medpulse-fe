import LatestDataType from '@/classes/LatestData'
import Patient from '@/classes/Patient'
import { Box, Grid, Typography } from '@mui/material'
import BigInfoBox from './InfoBoxes/BigInfoBox'
import SleepBox from './InfoBoxes/SleepBox'
import SmallInfoBox from './InfoBoxes/SmallInfoBox'

type Props = {
  latestData: LatestDataType
  patient: Patient
}

const LatestData = ({ latestData, patient }: Props): JSX.Element => {
  const { latestActivity, latestBloodOxygen, latestBloodPressure } = latestData

  return (
    <>
      <SleepBox patient={patient}/>
      <Box mt={5}>
        <Typography variant='h5' mb={2}>Activity data</Typography>

        <Grid  container spacing={10}>
          <Grid item xs={12} md={3}>
            <SmallInfoBox title='Steps' date={latestActivity.formattedDate} value={latestActivity.formattedSteps} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SmallInfoBox title='Distance' date={latestActivity.formattedDate} value={latestActivity.formattedDistance} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SmallInfoBox title='Burned calories' date={latestActivity.formattedDate} value={latestActivity.formattedCalories} />
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <Typography variant='h5' mb={2}>Heart data</Typography>

        <Grid  container spacing={10}>
          <Grid item xs={12} md={3}>
            <BigInfoBox title='Blood pressure' date={latestBloodPressure.formattedDate} value={latestBloodPressure.formattedBloodPressure} />
          </Grid>
          <Grid item xs={12} md={3}>
            <BigInfoBox title='Blood oxygen' date={latestBloodOxygen.formattedDate} value={latestBloodOxygen.formattedBloodOxygen} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default LatestData