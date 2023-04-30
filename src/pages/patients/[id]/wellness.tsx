import Header from '@/components/Patients/Header'
import { usePatient } from '@/hooks/patients'
import { Typography } from '@mui/material'

type Props = {
  id: string
}
const Wellness = ({ id }: Props): JSX.Element => {
  const { patient, isLoading } = usePatient(id)
  
  if(isLoading) return (<Typography>Loading...</Typography>)
  if(!patient) return (<Typography>Patient not found</Typography>)

  return (
    <>
      <Header patient={patient} title='Wellness reports'/>
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

export default Wellness