import LatestData from '@/classes/LatestData'
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

type usePatientReturnType = {
  latestData: LatestData | undefined
  patient: Patient | undefined
  isLoading: boolean
}

export const usePatient = (id: string): usePatientReturnType => {
  const { data: latestData, isLoading } = useSWR<LatestData>(API_PATHS.PATIENTS.LATEST_DATA.replace(':id', id), async url => {
    const { data } = await axios.get(url);

    return data.body;
  });

  const { data: patient, isLoading: isLoadingPatient } = useSWR<Patient>(API_PATHS.PATIENTS.SHOW.replace(':id', id), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    latestData: latestData ? new LatestData(latestData) : undefined,
    patient: patient ? new Patient(patient) : undefined,
    isLoading: isLoading || isLoadingPatient,
  }
}