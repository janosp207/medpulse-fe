import BasicPatientInfo from '@/components/Patients/BasicPatientInfo'
import LatestData from '@/components/Patients/LatestData'
import { Grid } from '@mui/material'

const PatientInfo = (): JSX.Element => {
  return(
    <Grid mt={5} container spacing={2}>
      <Grid item xs={12} md={3}>
        <BasicPatientInfo />
      </Grid>
      <Grid item xs={12} md={9}>
        <LatestData />
      </Grid>
    </Grid>
  )
}

export default PatientInfo