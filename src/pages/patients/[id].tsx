import { usePatient } from '@/hooks/patients'
import { Typography } from '@mui/material'
import Header from '@/components/Patients/Header'

const PatientsProfile = ({ id } : {id: string}): JSX.Element => {
  const { latestData, patient } = usePatient(id)

  if (!latestData || !patient) return <Typography>Loading...</Typography>

  return (
    <>
      <Header patient={patient} />
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

export default PatientsProfile