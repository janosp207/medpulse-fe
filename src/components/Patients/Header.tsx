import Patient from '@/classes/Patient'
import { PATHS } from '@/router'
import { Home } from '@mui/icons-material'
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
        <Button sx={{ width: 250, height: 40, color: 'black', backgroundColor: '#D1DFE5' }}>Add threshold values</Button>
      </Box>

      <LimitsDialog patient={patient} open={true} onClose={() => setOpenDialog(false)}/>
    </Box>
  )
}

export default Header