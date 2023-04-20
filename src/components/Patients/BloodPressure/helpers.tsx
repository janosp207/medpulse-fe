import { BloodPressureData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';

export enum BloodPressureClassification {
  High = 'high',
  Low = 'low',
  Normal = 'normal'
}

export const prepareBloodPressureDataGrid = (bloodPressureData: BloodPressureData[]): any => {
  //prepare data for datagrid
  const rows = bloodPressureData.map(data => {
    return {
      id: data.id,
      systolic: data.systolic,
      diastolic: data.diastolic,
      date: data.createdAt
    }
  })

  //sort by date
  rows.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return rows
}


export const classifyBloodPressure = (systolic: number, diastolic: number, limitValues: LimitValues):string => {
  if (systolic >= limitValues.systolicMax || diastolic >=limitValues.diastolicMax) {
    return BloodPressureClassification.High
  } else if (systolic <= limitValues.systolicMin || diastolic <= limitValues.diastolicMin) {
    return BloodPressureClassification.Low
  } else {
    return BloodPressureClassification.Normal
  }
}