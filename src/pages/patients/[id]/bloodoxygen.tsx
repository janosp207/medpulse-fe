import BloodOxygenChart from '@/components/Charts/BloodOxygenChart'
import Header from '@/components/Patients/Header'
import { useBloodOxygenData } from '@/hooks/measurements'
import { useLimitValues, usePatient } from '@/hooks/patients'
import { Typography } from '@mui/material'

const BloodOxygen = ({ id }: {id: string}): JSX.Element => {
  const { bloodOxygenData, isLoading } = useBloodOxygenData(id)
  const { patient, isLoading: isPatientLoading } = usePatient(id)
  const { limitValues } = useLimitValues(id)

  if(isLoading || isPatientLoading) return (<Typography>Loading...</Typography>)
  if(!patient) return (<Typography>Patient not found</Typography>)
  

  return (
    <>
      <Header patient={patient} title={'Blood oxygen data'}/>
      { bloodOxygenData?.length ? 
        <BloodOxygenChart bloodOxygenData={bloodOxygenData} threshold={limitValues?.bloodOxygenMin}/> :
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