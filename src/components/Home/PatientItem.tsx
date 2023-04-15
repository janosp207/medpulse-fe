import Patient from '@/classes/Patient';
import { PATHS } from '@/router';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Stack, Typography, styled } from '@mui/material';
import Link from 'next/link';

type Props = {
  patient: Patient;
}

const BoxStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: 30,
  backgroundColor: '#D1DFE5',
  marginBottom: 10,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 30,
})

const PatientItem = ({ patient }: Props): JSX.Element => {
  return (
    <BoxStyled>
      <Stack>
        <Typography>Name</Typography>
        <Typography fontWeight='bold'>{patient.user_id}</Typography>
      </Stack>
      <Box>
        <Link href={PATHS.PATIENT.SHOW.replace(':id', `${patient.user_id}`)}>
          <ArrowForwardIosIcon />
        </Link>
      </Box>
    </BoxStyled>
  );
}

export default PatientItem