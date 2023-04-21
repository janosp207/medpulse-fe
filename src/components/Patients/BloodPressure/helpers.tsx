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
      pulsePressure: data.pulsePressure,
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

export const getAvarageBloodPressureValues = (bloodPressureData: BloodPressureData[]): {avarageSystolic: number, avarageDiastolic: number, avaragePulsePressure: number}=> {
  //return avg systolic, avg diastolic, avg pulse pressure
  const avarageSystolic = bloodPressureData.reduce((acc, curr) => acc + curr.systolic, 0) / bloodPressureData.length
  const avarageDiastolic = bloodPressureData.reduce((acc, curr) => acc + curr.diastolic, 0) / bloodPressureData.length
  const avaragePulsePressure = bloodPressureData.reduce((acc, curr) => acc + curr.pulsePressure, 0) / bloodPressureData.length

  //round to 2 decimals
  const round = (num: number) => Math.round(num * 100) / 100

  return {
    avarageSystolic: round(avarageSystolic),
    avarageDiastolic: round(avarageDiastolic),
    avaragePulsePressure: round(avaragePulsePressure)
  }
}