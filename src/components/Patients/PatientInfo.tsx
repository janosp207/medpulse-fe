import LatestDataType from '@/classes/LatestData'
import Patient from '@/classes/Patient'
import BasicPatientInfo from '@/components/Patients/BasicPatientInfo'
import { Box, Grid } from '@mui/material'
import LatestData from './LatestData'

type Props = {
  patient: Patient
  latestData: LatestDataType
}

const PatientInfo = ({ patient, latestData }: Props): JSX.Element => {
  return(
    <Box mt={5}>
      <Grid pr={3} pl={3} container spacing={12}>
        <Grid item xs={12} md={4}>
          <BasicPatientInfo patient={patient}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <LatestData latestData={latestData}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PatientInfo