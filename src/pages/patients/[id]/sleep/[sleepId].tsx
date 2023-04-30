/* eslint-disable @typescript-eslint/ban-types */
import SleepLineChart from '@/components/Charts/SleepLineChart'
import LimitBox from '@/components/LimitBox'
import Header from '@/components/Patients/Header'
import { usePatient } from '@/hooks/patients'
import { useSleep } from '@/hooks/sleep'
import { Box, Typography } from '@mui/material'

const PatientWeight = ({ id, sleepId }: {id: string, sleepId: string}): JSX.Element => {
  const { patient, isLoading: isPatientLoading } = usePatient(id)
  const { sleepData, sleepSummary, isLoading } = useSleep(id, sleepId)

  const colors = {
    'Awake': 'rgb(255, 128, 0, 0.2)',
    'Light sleep': 'rgb(100, 100, 255, 0.2)',
    'Deep sleep': 'rgb(30, 30, 255, 0.2)',
    'REM': 'rgb(0, 0, 255, 0.3)',
  }

  if (isPatientLoading || isLoading) return <Typography>Loading...</Typography>

  if (!patient) return <Typography>Could not find patient</Typography>
  if (!sleepData) return <Typography>Could not find sleep data</Typography>

  return (
    <>
      <Header patient={patient} title={'Sleep data'}/>
      {sleepSummary && 
            <Box mt={5}>
              <Typography mb={2} variant='h5'>Sleep Summary</Typography>
              <Box display='flex' flexDirection='row' gap={3}>
                <LimitBox
                  title='Sleep time'
                  limit={sleepSummary.duration}
                />
                <LimitBox
                  title='Sleep efficiency'
                  limit={sleepSummary.formattedEfficiency}
                />
                <LimitBox
                  title='AVG HR'
                  limit={sleepSummary.hrAverage}
                  unit=' BPM'
                />
                <LimitBox
                  title='MIN HR'
                  limit={sleepSummary.hrMin}
                  unit=' BPM'
                />
                <LimitBox
                  title='MAX HR'
                  limit={sleepSummary.hrMax}
                  unit=' BPM'
                />
                <LimitBox
                  title='AHI'
                  limit={sleepSummary.ahi}
                  backgroundColor={sleepSummary.ahiColor}
                />
              </Box>
              { sleepSummary.ahiSeverity === 'Moderate' || sleepSummary.ahiSeverity === 'Severe' ?
                <Typography variant='h5' color={sleepSummary.ahiColor} fontWeight={'bold'} mt={2}>
                  {sleepSummary.ahiSeverity} sleep apnea. An avarage of {sleepSummary.ahi} apneas per hour.
                </Typography> : ''
              }
            </Box>
      }
      <Box mt={5}>
        <Typography mb={2} variant='h5'>Legend</Typography>
        <Box display='flex' flexDirection='row' gap={3}>
          {Object.keys(colors).map(key => (
            <Box key={key} display='flex' flexDirection='row' alignItems='center' gap={1}>
              <Box width={20} height={20} bgcolor={colors[key as keyof object]}></Box>
              <Typography>{key}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      
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