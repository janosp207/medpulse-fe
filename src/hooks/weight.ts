import { WeightData } from '@/classes/LatestData';
import { API_PATHS } from '@/router';
import axios from '@/utils/axios';
import useSWR from 'swr';

type usePatientsReturnType = {
  weightData: WeightData[] | undefined
  isLoading: boolean
}

export const useWeightData = (id: string): usePatientsReturnType => {
  const { data: weightData, isLoading } = useSWR<WeightData[]>(API_PATHS.PATIENTS.WEIGHT.replace(':id', id), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    weightData: weightData ? weightData.map((weight: any) => new WeightData(weight)) : undefined,
    isLoading: isLoading,
  }
}
