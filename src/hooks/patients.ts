import Patient from '@/classes/Patient'
import { API_PATHS } from '@/router'
import axios from '@/utils/axios'
import useSWR from 'swr'

type usePatientsReturnType = {
  patients: Patient[] | undefined
  isLoading: boolean
}

export const usePatients = (): usePatientsReturnType => {
  const { data: patients, isLoading } = useSWR<Patient[]>(API_PATHS.PATIENTS.GET, async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    patients: patients ? patients.map((patient: any) => new Patient(patient)) : undefined,
    isLoading: isLoading,
  }
}