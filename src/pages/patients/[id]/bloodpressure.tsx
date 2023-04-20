import BloodPressureChart from '@/components/Charts/BloodPresusreChart'
import LimitBox from '@/components/LimitBox'
import BloodPressureDatagrid from '@/components/Patients/BloodPressure/BloodPressureDatagrid'
import Header from '@/components/Patients/Header'
import { useBloodPressureData } from '@/hooks/measurements'
import { useLimitValues, usePatient } from '@/hooks/patients'
import { Box, Typography } from '@mui/material'

type Props = {
  id: string
}

const BloodPressure = ({ id }: Props): JSX.Element => {
  const { patient } = usePatient(id)
  const { bloodPressureData, isLoading } = useBloodPressureData(id)
  const { limitValues, isLoading: isLimitValuesLoading } = useLimitValues(id)

  if (isLoading || isLimitValuesLoading) return (<Typography>Loading...</Typography>)

  if (!patient) return (<Typography>Patient not found</Typography>)
  if (!bloodPressureData) return (<Typography>Blood pressure data not found</Typography>)

  const { hypotensionLimits, hypertensionLimits } = limitValues || {}

  return (
    <>
      <Header patient={patient} title={'Blood pressure data'}/>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <BloodPressureChart bloodPressureData={bloodPressureData} 
          hypotension={hypotensionLimits} 
          hypertension={hypertensionLimits}
        />
        <Box sx={{ mt: 8, ml: 2 }}>
          <Typography variant={'h5'} fontWeight='bold'>Limits</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 3 }}>
            <LimitBox title={'Hypertension'} limit={`${hypertensionLimits?.systolic}/${hypertensionLimits?.diastolic}` } backgroundColor='rgb(255, 30, 30, 0.2)'/>
            <LimitBox title={'Hypotension'} limit={`${hypotensionLimits?.systolic}/${hypotensionLimits?.diastolic}` } backgroundColor='rgb(30, 30, 255, 0.2)'/>
          </Box>
        </Box>
      </Box>
      <BloodPressureDatagrid bloodPressureData={bloodPressureData} limitValues={limitValues}/>
    </>
  )
} 

type ServerSideProps = {
  params: {
    id: string
  }
}

type SSPReturn = {
  props: {
    id: string
  }
}

//get the id from the url
export async function getServerSideProps({ params }: ServerSideProps): Promise<SSPReturn> {
  const { id } = params
  return {
    props: {
      id
    }
  }
}

export default BloodPressure