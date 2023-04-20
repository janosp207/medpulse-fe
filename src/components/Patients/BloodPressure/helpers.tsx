import { BloodPressureData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';

enum BloodPressureClassification {
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

  return rows
}


export const classifyBloodPressure = (systolic: number, diastolic: number, limitValues: LimitValues):string => {
  if (systolic > limitValues.systolicMax || diastolic > limitValues.diastolicMax) {
    return BloodPressureClassification.High
  } else if (systolic < limitValues.systolicMin || diastolic < limitValues.diastolicMin) {
    return BloodPressureClassification.Low
  } else {
    return BloodPressureClassification.Normal
  }
}