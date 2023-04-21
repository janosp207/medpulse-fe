import SleepLineChart from '@/components/Charts/SleepLineChart'
import LimitBox from '@/components/LimitBox'
import Header from '@/components/Patients/Header'
import { usePatient } from '@/hooks/patients'
import { useSleep } from '@/hooks/sleep'
import { Box, Typography } from '@mui/material'

const PatientWeight = ({ id, sleepId }: {id: string, sleepId: string}): JSX.Element => {
  const { patient, isLoading: isPatientLoading } = usePatient(id)
  const { sleepData, sleepSummary, isLoading } = useSleep(id, sleepId)

  if (isPatientLoading || isLoading) return <Typography>Loading...</Typography>

  if (!patient) return <Typography>Could not find patient</Typography>
  if (!sleepData) return <Typography>Could not find sleep data</Typography>

  return (
    <>
      <Header patient={patient} title={'Sleep data'}/>
      <SleepLineChart sleepData={sleepData}/>
      {sleepSummary && 
            <Box mt={5}>
              <Typography mb={2} variant='h5'>Sleep Summary</Typography>
              <Box display='flex' flexDirection='row' gap={3}>
                <LimitBox
                  title='Total Sleep Time'
                  limit={sleepSummary.duration}
                />
                <LimitBox
                  title='Sleep Efficiency'
                  limit={sleepSummary.formattedEfficiency}
                />
                <LimitBox
                  title='Avarage Heart Rate'
                  limit={sleepSummary.hrAverage}
                  unit=' BPM'
                />
                <LimitBox
                  title='Heart rate min'
                  limit={sleepSummary.hrMin}
                  unit=' BPM'
                />
                <LimitBox
                  title='Heart rate max'
                  limit={sleepSummary.hrMax}
                  unit=' BPM'
                />
              </Box>
            </Box>
      }
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