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
  backgroundColor: '#D1DFE5',
  color: 'black',
  borderRadius: 10
})

const SleepLog = ({ sleepLog, patientId }: Props): JSX.Element => {
  const { hours, minutes } = sleepLog.duration

  return (
    <Link href={PATHS.SLEEP.SHOW.replace(':id', patientId).replace(':sleepId', `${sleepLog.id}`)}>
      <StyledButton>
        <Typography>{sleepLog.formattedDate}</Typography>
        <Typography variant='h6' fontWeight='bold'>{hours}h {minutes}m</Typography>
      </StyledButton>
    </Link>
  )
}

export default SleepLog