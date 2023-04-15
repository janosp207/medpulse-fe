import Patient from '@/classes/Patient'
import { Box, Button, Stack, Typography } from '@mui/material'

const Header = ({ patient }: { patient: Patient }): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
      <Stack>
        <Typography variant="h1" fontWeight='500'>{patient.name}</Typography>
        <Typography variant="h4">Latest data dashboard</Typography>
      </Stack>
    
      <Button sx={{ width: 150, height: 40, color: 'black'  }}>Add limit values</Button>
    </Box>
  )
}

export default Header