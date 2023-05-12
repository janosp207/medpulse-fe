import { SleepSummary } from '@/classes/LatestData';
import Patient from '@/classes/Patient';
import { PATHS } from '@/router';
import { formatDate } from '@/utils/helpers';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import Link from 'next/link';

const SleepInfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#D1DFE5',
  justifyContent: 'space-between',
  maxWidth: '100%',
  height: 100,
  borderRadius: 20,
  paddingLeft: 50,
  paddingRight: 10,
})

const SleepScore = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: 10,
  width: 100,
  height: 80,
  textAlign: 'center',
  backgroundColor: '#7B949F',
  marginLeft: 50,
  color: 'white',

  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer'
  },
})

type Props = {
  patient: Patient
  sleepSummary: SleepSummary
}

const SleepBox = ({ patient, sleepSummary }: Props): JSX.Element => {
  return (
    <SleepInfoBox>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Stack>
          <Typography variant='h5'>Sleep duration</Typography>
          <Typography variant='h4' fontWeight='bold'>{sleepSummary.duration}</Typography>
        </Stack>

        <Stack>
          <Typography variant='h5'>Efficiency</Typography>
          <Typography variant='h4' fontWeight='bold'>{sleepSummary.formattedEfficiency}</Typography>
        </Stack>

        <Stack>
          <Typography variant='h5'>HR</Typography>
          <Typography variant='h4' fontWeight='bold'>{sleepSummary.hrAverage}</Typography>
        </Stack>

        <Stack>
          <Typography variant='h5'>Score</Typography>
          <Typography variant='h4' fontWeight='bold'>{sleepSummary.sleepScore}</Typography>
        </Stack>
      </Box>

      <Link href={PATHS.SLEEP.INDEX.replace(':id', patient.user_id)}>
        <SleepScore>
          <Stack>
            <Typography fontSize={10} fontWeight='bold' color='black'>{formatDate(sleepSummary.startdate)}</Typography>
            <Typography fontSize={14} color='black' fontWeight={'bold'}>More info</Typography>
          </Stack>
        </SleepScore>
      </Link>
      
    </SleepInfoBox>
  )
};

export default SleepBox;