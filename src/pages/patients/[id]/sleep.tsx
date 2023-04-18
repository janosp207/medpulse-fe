import Header from '@/components/Patients/Header'
import { usePatient } from '@/hooks/patients'
import { Typography } from '@mui/material'

const PatientWeight = ({ id }: {id: string}): JSX.Element => {
  const { patient, isLoading: isPatientLoading } = usePatient(id)

  if (isPatientLoading) return <Typography>Loading...</Typography>

  if (!patient) return <Typography>Could not find patient</Typography>

  return (
    <>
      <Header patient={patient} title={'Sleep data'}/>
    </>
  )
}

type ServerSideProps = {
  params: {
    id: string
  }
}

type SSPReturn = {
  props: {
    id: string
  }
}

//get the id from the url
export async function getServerSideProps({ params }: ServerSideProps): Promise<SSPReturn> {
  const { id } = params
  return {
    props: {
      id
    }
  }
}

export default PatientWeight