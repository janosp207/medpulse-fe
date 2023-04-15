import Header from '@/components/Patients/Header'
import PatientInfo from '@/components/Patients/PatientInfo'
import { usePatient } from '@/hooks/patients'
import { Typography } from '@mui/material'

const PatientsProfile = ({ id } : {id: string}): JSX.Element => {
  const { latestData, patient } = usePatient(id)

  if (!latestData || !patient) return <Typography>Loading...</Typography>

  return (
    <>
      <Header patient={patient} />
      <PatientInfo patient={patient} latestData={latestData} />
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