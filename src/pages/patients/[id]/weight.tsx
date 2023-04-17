import { MeasurementType } from '@/classes/LatestData'
import Header from '@/components/Patients/Header'
import WeightCharts from '@/components/Weight/WeightCharts'
import { useWeightData } from '@/hooks/measurements'
import { useLimitValues, usePatient } from '@/hooks/patients'
import { prepareWeightDatasets } from '@/utils/helpers'
import { Typography } from '@mui/material'

const PatientWeight = ({ id }: {id: string}): JSX.Element => {
  const { patient, isLoading: isPatientLoading } = usePatient(id)
  const { weightData, fatRatioData, isLoading } = useWeightData(id, [MeasurementType.Weight, MeasurementType.FatRatio])
  const { limitValues, isLoading: isLimitValuesLoading } = useLimitValues(id)

  if (isLoading || isPatientLoading || isLimitValuesLoading) return <Typography>Loading...</Typography>
  if (!patient) return <Typography>Could not find patient</Typography>

  const datasets = prepareWeightDatasets(weightData, fatRatioData, limitValues)

  return (
    <>
      <Header patient={patient} title={'Weight data'}/>
      <WeightCharts datasets={datasets} />
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
