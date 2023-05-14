import PatientsList from '@/components/Home/PatientsList';
import { usePatients } from '@/hooks/patients';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function Home(): JSX.Element {
  const router = useRouter()
  const id = useRef('')
  
  useEffect(() => {
    id.current = localStorage.getItem('id') || ''
  }, [id])

  const { patients, error, isLoading } = usePatients(id.current)

  if (!patients) return <Typography variant="h1">Loading</Typography>

  return (
    <>
      <Typography variant="h1">BP</Typography>
      <PatientsList patients={patients} />
    </>
  )
}
