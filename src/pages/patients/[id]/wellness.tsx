import FilledLineChart from '@/components/Charts/FilledLineChart'
import Header from '@/components/Patients/Header'
import { usePatient, useWellnessRatings } from '@/hooks/patients'
import { prepareWellnessDatasets } from '@/utils/helpers'
import { Box, Typography } from '@mui/material'

type Props = {
  id: string
}
const Wellness = ({ id }: Props): JSX.Element => {
  const { patient, isLoading } = usePatient(id)
  const { wellnessRatings, isLoading: isWellnessLoading } = useWellnessRatings(id)
  
  if(isLoading) return (<Typography>Loading...</Typography>)
  if(!patient) return (<Typography>Patient not found</Typography>)
  if(!wellnessRatings) return (<Typography>No data available</Typography>)
  if(isWellnessLoading) return (<Typography>Loading...</Typography>)

  const datasets = prepareWellnessDatasets(wellnessRatings)

  return (
    <>
      <Header patient={patient} title='Wellness reports'/>
      <Box sx={{ width: '50%' }}>
        <FilledLineChart datasets={datasets} title='Titel'/>
      </Box>
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