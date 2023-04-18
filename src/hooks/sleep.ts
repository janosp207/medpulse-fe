import SleepLog from '@/classes/SleepLog';
import { API_PATHS } from '@/router';
import axios from '@/utils/axios';
import useSWR from 'swr';

type usePatientsReturnType = {
  sleepLogs?: SleepLog[] | undefined
  isLoading: boolean
}

export const useSleep = (patientId: string): usePatientsReturnType => {
  const { data: sleepLogs, isLoading } = useSWR(API_PATHS.SLEEP.INDEX.replace(':id', patientId), async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return {
    sleepLogs: sleepLogs ? sleepLogs.map((sleepLog: any) => new SleepLog(sleepLog)) : undefined,
    isLoading: isLoading,
  }
}