import { BodyFatData, HeightData, WeightData } from '@/classes/LatestData';
import { API_PATHS } from '@/router';
import axios from '@/utils/axios';
import useSWR from 'swr';


type usePatientsReturnType = {
  weightData?: WeightData[] | undefined
  fatRatioData?: BodyFatData[] | undefined
  heightData ?: HeightData | undefined
  isLoading: boolean
}

type WeightDataSWR = {
  weightData?: WeightData[]
  fatRatioData?: BodyFatData[]
  heightData?: HeightData[]
}

export const useWeightData = (id: string, types: number[]): usePatientsReturnType => {
  let stringTypes = ''
  types.forEach((type, index) => {
    stringTypes += `${type}`
    if (index !== types.length - 1) {
      stringTypes += ','
    }
  })
  const { data, isLoading } = useSWR<WeightDataSWR>(API_PATHS.PATIENTS.MEASUREMENTS.replace(':id', id).replace(':type', stringTypes), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    weightData: data?.weightData ? data?.weightData.map((weight: any) => new WeightData(weight)) : undefined,
    fatRatioData: data?.fatRatioData ? data?.fatRatioData.map((fatRatio: any) => new BodyFatData(fatRatio)) : undefined,
    heightData: data?.heightData ? new HeightData(data?.heightData[0]) : undefined,
    isLoading: isLoading,
  }
}
