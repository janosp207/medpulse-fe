import FilledLineChart from '@/components/Charts/FilledLineChart'
import Header from '@/components/Patients/Header'
import { usePatient } from '@/hooks/patients'
import { useWeightData } from '@/hooks/weight'
import { Typography } from '@mui/material'

const PatientWeight = ({ id }: {id: string}): JSX.Element => {
  const { patient } = usePatient(id)
  const { weightData } = useWeightData(id)

  if (!patient || !weightData) return <Typography>Loading...</Typography>

  return (
    <>
      <Header patient={patient} title={'Weight data'}/>
      <FilledLineChart data={weightData} label={'Weight data'} unit={'kg'} />
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
