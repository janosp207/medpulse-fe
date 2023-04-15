import Patient from '@/classes/Patient';
import { PATHS } from '@/router';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import Link from 'next/link';

type Props = {
  patient: Patient;
}

const BoxStyled = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  borderRadius: 30,
  backgroundColor: '#D1DFE5',
  marginBottom: 10,
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'black',
  padding: 30,
})

const PatientItem = ({ patient }: Props): JSX.Element => {
  return (
    <Link href={PATHS.PATIENT.SHOW.replace(':id', `${patient.user_id}`)} style={{ textDecoration: 'none' }}>
      <BoxStyled>
        <Stack>
          <Typography>Name</Typography>
          <Typography fontWeight='bold'>{patient.user_id}</Typography>
        </Stack>
        <Box>
          <ArrowForwardIosIcon />
        </Box>
      </BoxStyled>
    </Link>

  );
}

export default PatientItem