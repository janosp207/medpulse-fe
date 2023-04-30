import FilledLineChart from '@/components/Charts/FilledLineChart'
import Header from '@/components/Patients/Header'
import { useActivity, usePatient } from '@/hooks/patients'
import { prepareActivityDatasets } from '@/utils/helpers'
import { Box, Typography } from '@mui/material'

type Props = {
  id: string
}

const Activity = ({ id }: Props): JSX.Element => {
  const { patient, isLoading } = usePatient(id)
  const { activity, isLoading: isActivityLoading } = useActivity(id)

  if(isLoading) return (<Typography>Loading...</Typography>)
  if(!patient) return (<Typography>Patient not found</Typography>)
  if(!activity) return (<Typography>No data available</Typography>)
  if(isActivityLoading) return (<Typography>Loading...</Typography>)

  const datasets = prepareActivityDatasets(activity)

  return (
    <>
      <Header title="Activity" patient={patient}/>
      <Box width={'50%'}>
        {
          datasets.map((dataset: any, index: number) => (
            <FilledLineChart key={index} datasets={[dataset]} title={dataset.label}/>
          ))
        }
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

export default Activity