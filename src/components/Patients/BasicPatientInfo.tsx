import LatestData from '@/classes/LatestData'
import Patient from '@/classes/Patient'
import { PATHS } from '@/router'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import Link from 'next/link'

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

const StyledInfoButton = styled(Button)({
  paddingTop: 10,
  paddingBottom: 10,
  marginTop: 10,
  backgroundColor: '#7B949F',
  width: '100%',
  borderRadius: '0 0 20px 20px',
  color: 'black',
  '&:hover': {
    backgroundColor: '#7B949F',
  }

})

type Props = {
  patient: Patient
  latestData: LatestData
}

const BasicPatientInfo = ({ patient, latestData }: Props): JSX.Element => {
  const { bmi, latestFatRatio, latestWeight  } = latestData

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
          <Typography variant="h5" fontWeight='bold'>{latestWeight.formattedDate}</Typography>
        </Stack>

        <Stack>
          <Typography mt={3} mb={3} variant="h3" fontWeight='bold'>{latestWeight.value} Kg</Typography>
          <Typography >BMI: {bmi}</Typography>
          <Typography >Fat ratio: {latestFatRatio.value}%</Typography>
        </Stack>
        <Link href={PATHS.PATIENT.WEIGHT.replace(':id', `${patient.user_id}`)} style={{ width: '100%' }}>
          <StyledInfoButton>
            <Typography fontWeight='bold'>More info</Typography>
          </StyledInfoButton>
        </Link>

      </StyledPatientWeightBox>

    </>
  )
}

export default BasicPatientInfo