import Header from '@/components/Patients/Header'
import SleepLog from '@/components/Sleep/SleepLog'
import { usePatient } from '@/hooks/patients'
import { useSleepLogs } from '@/hooks/sleep'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const PatientWeight = ({ id }: {id: string}): JSX.Element => {
  const { patient, isLoading: isPatientLoading } = usePatient(id)
  const { sleepLogs, isLoading: isSleepLoading } = useSleepLogs(id)


  if (isPatientLoading || isSleepLoading) return <Typography>Loading...</Typography>

  if (!patient) return <Typography>Could not find patient</Typography>

  if (!sleepLogs) return <Typography>Could not find sleep logs</Typography>

  return (
    <>
      <Header patient={patient} title={'Sleep data'}/>
      <Box mt={3} sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {sleepLogs.map(sleepLog => (
          <SleepLog sleepLog={sleepLog} key={sleepLog.id} patientId={patient.user_id}/>
        ))}
      </Box>
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

export default PatientWeight