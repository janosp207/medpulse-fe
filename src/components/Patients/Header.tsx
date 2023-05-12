import Patient from '@/classes/Patient'
import { PATHS } from '@/router'
import { Home, LogoutRounded } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LimitsDialog from './LimitsDialog'
const Header = ({ patient, title }: { patient: Patient, title: string }): JSX.Element => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const goBack = () => {
    router.back();
  }

  const logout = () => {
    localStorage.removeItem('token');
    router.push(PATHS.DOCTOR.LOGIN);
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
        <Button sx={{ width: 250, height: 40, color: 'black', backgroundColor: '#D1DFE5' }} onClick={() => setOpenDialog(true)}>Add threshold values</Button>
        <Button onClick={() => logout()}sx={{ width: 50, height: 40, color: 'black', backgroundColor: '#D1DFE5' }}><LogoutRounded/></Button>
      </Box>

      <LimitsDialog patient={patient} open={openDialog} onClose={() => setOpenDialog(false)}/>
    </Box>
  )
}

export default Header