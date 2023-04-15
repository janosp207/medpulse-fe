import PatientsList from '@/components/Home/PatientsList'
import { usePatients } from '@/hooks/patients'
import { Typography } from '@mui/material'

export default function Home(): JSX.Element {
  const { patients } = usePatients()

  if (!patients) return <Typography variant="h1">Loading...</Typography>

  return (
    <>
      <Typography variant="h1">Hello</Typography>
      <PatientsList patients={patients} />
    </>
  )
}
