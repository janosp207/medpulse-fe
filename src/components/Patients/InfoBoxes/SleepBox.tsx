import { Box, Stack, Typography, styled } from '@mui/material';

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

const SleepScore = styled(Box)({
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

const SleepBox = (): JSX.Element => {
  return (
    <SleepInfoBox>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Stack>
          <Typography variant='h5'>Sleep duration</Typography>
          <Typography variant='h4' fontWeight='bold'>7h</Typography>
        </Stack>

        <Stack>
          <Typography variant='h5'>Quality</Typography>
          <Typography variant='h4' fontWeight='bold'>val</Typography>
        </Stack>

        <Stack>
          <Typography variant='h5'>HR</Typography>
          <Typography variant='h4' fontWeight='bold'>60</Typography>
        </Stack>
      </Box>

      <SleepScore>
        <Stack>
          <Typography fontWeight='bold'>15.4.2023</Typography>
          <Typography fontWeight='bold' variant='h4'>94</Typography>
        </Stack>
      </SleepScore>
    </SleepInfoBox>
  )
};

export default SleepBox;