import BasicPatientInfo from '@/components/Patients/BasicPatientInfo'
import LatestData from '@/components/Patients/LatestData'
import { Grid } from '@mui/material'

const PatientInfo = (): JSX.Element => {
  return(
    <Grid mt={0} pr={3} pl={3} container spacing={12}>
      <Grid item xs={12} md={4}>
        <BasicPatientInfo />
      </Grid>
      <Grid item xs={12} md={8}>
        <LatestData />
      </Grid>
    </Grid>
  )
}

export default PatientInfo