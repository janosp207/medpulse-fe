import { BloodOxygenData } from '@/classes/LatestData';
import { formatDate } from '@/utils/helpers';

export const prepareBloodOxygenDatagrid = (bloodOxygenData: BloodOxygenData[]): any => {

  const sortedBloodOxygenData = bloodOxygenData.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const data = [] as any;

  sortedBloodOxygenData.forEach((bloodOxygen: BloodOxygenData) => {
    data.push({
      id: bloodOxygen.id,
      date: formatDate(bloodOxygen.createdAt),
      bloodOxygen: bloodOxygen.bloodOxygen*100,
    })
  })

  return data;
}

export const classifyBloodOxygen = (value: number, limitValue: number): any => {
  return value <= limitValue ? 'low' : 'normal';
}

export const getMonthAvarage = (bloodOxygenData: BloodOxygenData[]): string => {
  //get last 30 records, if there is less than 30 records, get all of them
  const last30Records = bloodOxygenData.slice(0, 30);
  const monthAvarage = last30Records.reduce((acc, curr) => acc + curr.bloodOxygen, 0) / last30Records.length;

  //format to 2 decimal places
  return `${(monthAvarage*100).toFixed(2)}`;
}

export const getBloodOxygenColor = (value: string, limit: number): string => {
  const number = parseFloat(value);
  return number <= limit ? 'rgb(255, 30, 30, 0.2)' : '#D1DFE5';
}
