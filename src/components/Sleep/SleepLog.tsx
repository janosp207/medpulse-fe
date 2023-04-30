import SleepLogClass from '@/classes/SleepLog'
import { PATHS } from '@/router'
import { Button, styled, Typography } from '@mui/material'
import Link from 'next/link'

type Props = {
  sleepLog: SleepLogClass
  patientId: string
}

const StyledButton = styled(Button)({
  width: 100,
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'black',
  borderRadius: 10
})

const SleepLog = ({ sleepLog, patientId }: Props): JSX.Element => {
  const duration = sleepLog.sleepSummary ? sleepLog.sleepSummary.duration : sleepLog.duration
  console.log(sleepLog)

  return (
    <Link href={PATHS.SLEEP.SHOW.replace(':id', patientId).replace(':sleepId', `${sleepLog.id}`)}>
      <StyledButton sx={{ backgroundColor: sleepLog.sleepSummary?.ahiColor || '#D1DFE5' }}>
        <Typography>{sleepLog.formattedDate}</Typography>
        <Typography variant='h6' fontWeight='bold'>{duration}</Typography>
        <Typography fontSize={10}>{sleepLog.sleepSummary?.ahiSeverity} apnea</Typography>
      </StyledButton>
    </Link>
  )
}

export default SleepLog