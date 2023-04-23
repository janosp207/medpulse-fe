import BloodOxygenChart from '@/components/Charts/BloodOxygenChart'
import LimitBox from '@/components/LimitBox'
import BloodOxygenDatagrid from '@/components/Patients/BloodOxygen/BloodOxygenDatagrid'
import { getBloodOxygenColor, getMonthAvarage } from '@/components/Patients/BloodOxygen/helpers'
import Header from '@/components/Patients/Header'
import { useBloodOxygenData } from '@/hooks/measurements'
import { useLimitValues, usePatient } from '@/hooks/patients'
import { Box, Typography } from '@mui/material'

const BloodOxygen = ({ id }: {id: string}): JSX.Element => {
  const { bloodOxygenData, isLoading } = useBloodOxygenData(id)
  const { patient, isLoading: isPatientLoading } = usePatient(id)
  const { limitValues } = useLimitValues(id)

  if(isLoading || isPatientLoading) return (<Typography>Loading...</Typography>)
  if(!patient) return (<Typography>Patient not found</Typography>)
  if(!bloodOxygenData) return (<Typography>No data available</Typography>)
  

  return (
    <>
      <Header patient={patient} title={'Blood oxygen data'}/>
      { bloodOxygenData?.length ? 
        <>
          <Box display='flex' flexDirection='row'>
            <BloodOxygenChart bloodOxygenData={bloodOxygenData} threshold={limitValues?.bloodOxygenMin}/>
            <Box mt={5} ml={3}>
              <Typography variant='h5' fontWeight='bold' mb={3}>Avarage value for past 30 days</Typography>
              <LimitBox title='Blood oxygen' limit={`${getMonthAvarage(bloodOxygenData)} %`} backgroundColor={limitValues?.bloodOxygenMin ? getBloodOxygenColor(getMonthAvarage(bloodOxygenData), limitValues?.bloodOxygenMin) : ''}/>
            </Box>
          </Box>
          <BloodOxygenDatagrid bloodOxygenData={bloodOxygenData} limitValues={limitValues}/>
        </>
        :
        <Typography>No data available</Typography>
      }
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

export default BloodOxygen