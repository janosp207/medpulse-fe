import Patient from '@/classes/Patient'
import { PATHS } from '@/router'
import { Home } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Header = ({ patient, title }: { patient: Patient, title: string }): JSX.Element => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
      <Stack>
        <Typography variant="h1" fontWeight='500'>{patient.name}</Typography>
        <Typography variant="h5">{title}</Typography>
      </Stack>
    
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={() => goBack()}sx={{ width: 100, height: 40, color: 'black', backgroundColor: '#D1DFE5' }}>Go back</Button>
        <Link href={PATHS.HOME}>
          <Button sx={{ width: 50, height: 40, color: 'black', backgroundColor: '#D1DFE5' }}><Home/></Button>
        </Link>
        <Button sx={{ width: 150, height: 40, color: 'black', backgroundColor: '#D1DFE5' }}>Add limit values</Button>
      </Box>

    </Box>
  )
}

export default Header