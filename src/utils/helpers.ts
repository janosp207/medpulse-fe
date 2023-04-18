/* eslint-disable @typescript-eslint/ban-types */
import { BodyFatData, HeightData, WeightData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';
import { SleepData } from '@/classes/SleepLog';

const SleepStates = {
  0: 'Awake',
  1: 'Light Sleep',
  2: 'Deep Sleep',
  3: 'REM',
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
  const labels = sleepData.map((sleep: SleepData) => sleep.startdate);
  const colors = {
    0: '#D1DFE5',
    1: '#7B949F',
    2: '#3D1E6E',
  }

  const datasets = []

  //group data from sleepData by SleepStates
  const sleepStateData = sleepData.reduce((acc: any, sleep: SleepData) => {
    const { state } = sleep;
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(sleep);
    return acc;
  }, {});

  //create dataset for each SleepState
  for (const state in sleepStateData) {
    const data = sleepStateData[state].map((sleep: SleepData) => ({
      x: sleep.startdate,
      y: sleep.state,
    }));

    datasets.push({
      label: SleepStates[state as keyof object],
      data,
      borderColor: colors[state as keyof object],
      backgroundColor: colors[state as keyof object],
      yAxisID: 'y-axis-1',
      xAxisID: 'x-axis-1',
      barThickness: 'flex',
    });
  }

  return {
    labels,
    datasets,
  }
}