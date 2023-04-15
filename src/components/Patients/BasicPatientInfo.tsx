import Patient from '@/classes/Patient'
import { Box, Stack, styled, Typography } from '@mui/material'

const StyledPatientInfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: '#D1DFE5',
  width: '100%',
  height: 100,
  borderRadius: 20,
})

const StyledPatientWeightBox = styled(Box)({ 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: '#D1DFE5',
  width: '100%',
  paddingTop: 20,
  borderRadius: 20,
  textAlign: 'center',
  marginTop: 40,
})

const StyledLinkBox = styled(Box)({
  paddingTop: 10,
  paddingBottom: 10,
  marginTop: 10,
  backgroundColor: '#7B949F',
  width: '100%',
  borderRadius: '0 0 20px 20px',
  //lighten up on hover
  '&:hover': {
    backgroundColor: '#7B949F',
    opacity: 0.8,
    cursor: 'pointer'
  },
})

type Props = {
  patient: Patient
}

const BasicPatientInfo = ({ patient }: Props): JSX.Element => {
  return (
    <>
      <StyledPatientInfoBox> 
        <Stack>
          <Typography >Name</Typography>
          <Typography variant='h5' fontWeight='bold'>{patient.name}</Typography>
        </Stack>
        <Stack>
          <Typography>Age</Typography>
          <Typography variant='h5' fontWeight='bold'>{patient.age}</Typography>
        </Stack>
      </StyledPatientInfoBox>

      <StyledPatientWeightBox>
        <Stack>
          <Typography>Weight</Typography>
          <Typography variant="h5" fontWeight='bold'>15.4.2023</Typography>
        </Stack>

        <Stack>
          <Typography mt={3} mb={3} variant="h3" fontWeight='bold'>78kg</Typography>
          <Typography >bmi</Typography>
          <Typography >body fat</Typography>
        </Stack>

        <StyledLinkBox>
          <Typography fontWeight='bold'>More info</Typography>
        </StyledLinkBox>
      </StyledPatientWeightBox>

    </>
  )
}

export default BasicPatientInfo