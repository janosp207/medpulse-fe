import SleepLineChart from '@/components/Charts/SleepLineChart'
import Header from '@/components/Patients/Header'
import { usePatient } from '@/hooks/patients'
import { useSleep } from '@/hooks/sleep'
import { Typography } from '@mui/material'

const PatientWeight = ({ id, sleepId }: {id: string, sleepId: string}): JSX.Element => {
  const { patient, isLoading: isPatientLoading } = usePatient(id)
  const { sleepData, isLoading } = useSleep(id, sleepId)

  if (isPatientLoading) return <Typography>Loading...</Typography>

  if (!patient) return <Typography>Could not find patient</Typography>
  if (!sleepData) return <Typography>Could not find sleep data</Typography>

  return (
    <>
      <Header patient={patient} title={'Sleep data'}/>
      <SleepLineChart sleepData={sleepData}/>
    </>
  )
}

type ServerSideProps = {
  params: {
    id: string
    sleepId: string
  }
}

type SSPReturn = {
  props: {
    id: string
    sleepId: string
  }
}

//get the id from the url
export async function getServerSideProps({ params }: ServerSideProps): Promise<SSPReturn> {
  const { id, sleepId } = params
  return {
    props: {
      id,
      sleepId,
    }
  }
}

export default PatientWeight