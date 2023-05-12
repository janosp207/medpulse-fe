import PatientsList from '@/components/Home/PatientsList';
import { usePatients } from '@/hooks/patients';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
  const router = useRouter()
  const { patients, error, isLoading } = usePatients()

  if (error && !isLoading) {
    router.push('/login')
  }

  if (!patients) return <Typography variant="h1">Loading</Typography>



  return (
    <>
      <Typography variant="h1">BP</Typography>
      <PatientsList patients={patients} />
    </>
  )
}
