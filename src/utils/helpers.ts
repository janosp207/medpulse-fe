/* eslint-disable @typescript-eslint/ban-types */
import { BodyFatData, HeightData, WeightData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';
import { SleepData, SleepStates } from '@/classes/SleepLog';

const Colors = {
  [SleepStates.Awake]: 'rgb(255, 128, 0, 0.2)',
  [SleepStates.LightSleep]: 'rgb(100, 100, 255, 0.2)',
  [SleepStates.DeepSleep]: 'rgb(30, 30, 255, 0.2)',
  [SleepStates.REM]: 'rgb(0, 0, 255, 0.2)',
}

export const formatDate = (date: string | number): string => {
  // if is number, check if is in seconds or milliseconds
  if (typeof date === 'number') {
    if (date < 10000000000) {
      date *= 1000;
    }
  }
  
  //format to dd.mm.yyyy
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};

export const getTimeFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  //check if AM or PM, ad 0 if needed
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12;
  const hours12Str = hours12 < 10 ? `0${hours12}` : hours12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours12Str}:${minutesStr} ${ampm}`;
};

type Props = {
  weightData?: WeightData[];
  fatRatioData?: BodyFatData[];
  heightData?: HeightData;
  limitValues?: LimitValues;
};

export const prepareWeightDatasets = ({ weightData, fatRatioData, heightData, limitValues }: Props): any => {
  const datasets = {
    weightDataset: [] as any,
    fatRatioDataset: [] as any,
    bmiDataset: [] as any,
  }

  const maxWeight = limitValues?.weight || 0;
  const maxBodyFat = limitValues?.fatRatio || 0;
  const maxBMI = limitValues?.bmi || 0;

  if(weightData) {
    datasets.weightDataset.push({
      label: 'Weight',
      data: weightData.map((weight: WeightData) => ({
        x: formatDate(weight.date),
        y: weight.value,
      })),
      borderColor: '#FF0000',
      backgroundColor: '#FF0000',
      yAxisID: 'y-axis-1',
      //conditionally change color
      pointBackgroundColor: weightData.map((weight: WeightData) => {
        if (weight.value > maxWeight && maxWeight !== 0) {
          return '#FFD700';
        }
        return '#FF0000';
      }),
      //change point size
      pointRadius: weightData.map((weight: WeightData) => {
        if (weight.value > maxWeight && maxWeight !== 0) {
          return 6;
        }
        return 3;
      }),
    })
  }

  if(fatRatioData) {
    datasets.fatRatioDataset.push( {
      label: 'Body fat ratio',
      data: fatRatioData.map((fatRatio: BodyFatData) => ({
        x: formatDate(fatRatio.date),
        y: fatRatio.value,
      })),
      borderColor: '#0000FF',
      backgroundColor: '#0000FF',
      yAxisID: 'y-axis-1',
      //conditionally change color
      pointBackgroundColor: fatRatioData.map((bodyFat: BodyFatData) => {
        if (bodyFat.value > maxBodyFat && maxBodyFat !== 0) {
          return '#D700FF';
        }
        return '#0000FF';
      }),
      //change point size
      pointRadius: fatRatioData.map((bodyFat: BodyFatData) => {
        if (bodyFat.value > maxBodyFat && maxBodyFat !== 0) {
          return 6;
        }
        return 3;
      }),
    })
  }

  if(heightData && weightData) {
    datasets.bmiDataset.push({
      label: 'BMI',
      data: weightData.map((weight: WeightData) => ({
        x: formatDate(weight.date),
        y: weight.calculateBMI(heightData.value),
      })),
      borderColor: '#00FF00',
      backgroundColor: '#00FF00',
      yAxisID: 'y-axis-1',
      //conditionally change color
      pointBackgroundColor: weightData.map((weight: WeightData) => {
        if (weight.calculateBMI(heightData.value) > maxBMI && maxBMI !== 0) {
          return '#FFD700';
        }
        return '#00FF00';
      }),
      //change point size
      pointRadius: weightData.map((weight: WeightData) => {
        if (weight.calculateBMI(heightData.value) > maxBMI && maxBMI !== 0) {
          return 6;
        }
        return 3;
      }),
    })
  }

  return datasets;
}

export const prepareSleepDatasets = (sleepData: SleepData[]): any => {
  //get array of all heart rate and their timestamps from sleepData
  const heartRates = [] as any;

  sleepData.forEach((sleep: SleepData) => {
    sleep.heartRates.forEach((heartRate: any) => {
      heartRates.push({
        x: heartRate.timestamp,
        y: heartRate.hr,
      })
    })
  })

  //sort heart rates by timestamp
  heartRates.sort((a: any, b: any) => {
    return a.x - b.x;
  })
  
  //create dataset for heart rate
  const heartRatesDataset = [{
    label: 'Heart rate',
    data: heartRates,
    borderColor: '#000',
    backgroundColor: '#000',
    yAxisID: 'y-axis-1',
    xAxisID: 'x-axis-1',
    borderWidth: 1,
    z: 1,
    pointHitRadius: 30,
  }]

  return heartRatesDataset;
}

export const prepareAnnotations = (sleepData: SleepData[]): any => {
  //create box annotations which start at sleepdata start and end at sleepdata end
  const annotations = [] as any;

  sleepData.forEach((sleep: SleepData) => {
    annotations.push({
      type: 'box',
      xMin: sleep.startdate,
      xMax: sleep.enddate,
      z: -1,
      backgroundColor: Colors[sleep.state],
      borderColor: Colors[sleep.state]
    })
  })

  return annotations;
}