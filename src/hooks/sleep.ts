import SleepLog, { SleepData } from '@/classes/SleepLog';
import { API_PATHS } from '@/router';
import axios from '@/utils/axios';
import useSWR from 'swr';

type useSleepLogsReturnType = {
  sleepLogs?: SleepLog[] | undefined
  isLoading: boolean
}

export const useSleepLogs = (patientId: string): useSleepLogsReturnType => {
  const { data: sleepLogs, isLoading } = useSWR(API_PATHS.SLEEP.INDEX.replace(':id', patientId), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    sleepLogs: sleepLogs ? sleepLogs.map((sleepLog: any) => new SleepLog(sleepLog)) : undefined,
    isLoading: isLoading,
  }
}

type useSleepReturnType = {
  sleepData: SleepData[] | undefined
  isLoading: boolean
}

export const useSleep = (patientId: string, sleepId: string): useSleepReturnType => {
  const { data: sleepData, isLoading } = useSWR(API_PATHS.SLEEP.SHOW.replace(':id', patientId).replace(':sleepId', sleepId), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    sleepData: sleepData ? sleepData.map((sleepData: any) => new SleepData(sleepData)) : undefined,
    isLoading: isLoading,
  }
}