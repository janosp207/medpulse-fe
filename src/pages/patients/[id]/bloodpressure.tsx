import BloodPressureChart from '@/components/Charts/BloodPresusreChart'
import Header from '@/components/Patients/Header'
import { useBloodPressureData } from '@/hooks/measurements'
import { usePatient } from '@/hooks/patients'
import { Typography } from '@mui/material'

type Props = {
  id: string
}

const BloodPressure = ({ id }: Props): JSX.Element => {
  const { patient } = usePatient(id)
  const { bloodPressureData, isLoading } = useBloodPressureData(id)

  if (isLoading) return (<Typography>Loading...</Typography>)

  if (!patient) return (<Typography>Patient not found</Typography>)
  if (!bloodPressureData) return (<Typography>Blood pressure data not found</Typography>)

  return (
    <>
      <Header patient={patient} title={'Blood pressure data'}/>
      <BloodPressureChart bloodPressureData={bloodPressureData}/>
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

export default BloodPressure