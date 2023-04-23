import LatestData from '@/classes/LatestData'
import LimitValues from '@/classes/LimitValues'
import Patient from '@/classes/Patient'
import Warning from '@/classes/Warning'
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
  patient: Patient | undefined
  isLoading: boolean
}

export const usePatient = (id: string): usePatientReturnType => {
  const { data: patient, isLoading: isLoadingPatient } = useSWR<Patient>(API_PATHS.PATIENTS.SHOW.replace(':id', id), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    patient: patient ? new Patient(patient) : undefined,
    isLoading: isLoadingPatient,
  }
}

type useLatestDataReturnType = {
  latestData: LatestData | undefined
  isLoading: boolean
}

export const useLatestData = (id: string): useLatestDataReturnType => {
  const { data: latestData, isLoading } = useSWR<LatestData>(API_PATHS.PATIENTS.LATEST_DATA.replace(':id', id), async url => {
    const { data } = await axios.get(url);

    return data.body;
  });


  return {
    latestData: latestData ? new LatestData(latestData) : undefined,
    isLoading: isLoading,
  }
}

type useLimitValuesReturnType = {
  limitValues: LimitValues | undefined
  store: (newLimitValues: LimitValues) => Promise<void>
  isLoading: boolean
}


export const useLimitValues = (id: string): useLimitValuesReturnType => {
  const { data: limitValues, isLoading, mutate } = useSWR(API_PATHS.PATIENTS.LIMIT_VALUES.replace(':id', id), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  const store = async (newLimitValues: LimitValues): Promise<void> => {
    await axios.post(API_PATHS.PATIENTS.LIMIT_VALUES.replace(':id', id), newLimitValues).then(() => {
      mutate(new LimitValues(newLimitValues), { revalidate: false })
    })
  }

  return {
    limitValues: limitValues ? new LimitValues(limitValues) : undefined,
    store,
    isLoading,
  }
}

type useWarningsReturnType = {
  warnings: Warning[] | undefined
  isLoading: boolean
}

export const useWarnings = (id: string): useWarningsReturnType => {
  const { data: warnings, isLoading } = useSWR(API_PATHS.PATIENTS.WARNINGS.replace(':id', id), async url => {
    const { data } = await axios.get(url);

    return data;
  });


  return {
    warnings : warnings ? warnings.map((warning: any) => new Warning(warning)) : undefined,
    isLoading,
  }
}