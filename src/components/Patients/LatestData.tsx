import { Box, Grid, Typography } from '@mui/material'
import BigInfoBox from './InfoBoxes/BigInfoBox'
import SleepBox from './InfoBoxes/SleepBox'
import SmallInfoBox from './InfoBoxes/SmallInfoBox'

const LatestData = (): JSX.Element => {
  return (
    <>
      <SleepBox />

      <Box mt={5}>
        <Typography variant='h5' mb={2}>Activity data</Typography>

        <Grid  container spacing={10}>
          <Grid item xs={12} md={3}>
            <SmallInfoBox title='Steps' date='15.4.2023' value='2003' />
          </Grid>
          <Grid item xs={12} md={3}>
            <SmallInfoBox title='Burned calories' date='15.4.2023' value='230kcal' />
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <Typography variant='h5' mb={2}>Heart data</Typography>

        <Grid  container spacing={10}>
          <Grid item xs={12} md={3}>
            <BigInfoBox title='Blood pressure' date='15.4.2023' value='120/100' />
          </Grid>
          <Grid item xs={12} md={3}>
            <BigInfoBox title='Blood oxygen' date='15.4.2023' value='94%' />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default LatestData