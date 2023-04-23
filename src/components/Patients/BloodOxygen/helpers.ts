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