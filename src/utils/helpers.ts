/* eslint-disable @typescript-eslint/ban-types */
import { ActivityData, BloodOxygenData, BloodPressureData, BodyFatData, HeightData, WeightData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';
import SleepLog, { SleepData, SleepStates } from '@/classes/SleepLog';

const Colors = {
  [SleepStates.Awake]: 'rgb(255, 128, 0, 0.2)',
  [SleepStates.LightSleep]: 'rgb(100, 100, 255, 0.2)',
  [SleepStates.DeepSleep]: 'rgb(30, 30, 255, 0.2)',
  [SleepStates.REM]: 'rgb(0, 0, 255, 0.3)',
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

export const getDurationFromTimestamps = (startdate: number, enddate: number): {hours: number, minutes: number} => {
  const startMs = startdate * 1000;
  const endMs = enddate * 1000;
  const durationInMs = endMs - startMs;
  const durationInMinutes = Math.floor(durationInMs / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  
  return { hours, minutes };
}

export const turnDurationToHoursAndMinutes = (duration: number): {hours: number, minutes: number} => {
  const durationInMinutes = Math.floor(duration / 60);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return { hours, minutes };
}

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
  const minWeight = limitValues?.weightMin || 0;
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
        if (weight.value < minWeight && minWeight !== 0) {
          return '#FFD700';
        }
        return '#FF0000';
      }),
      //change point size
      pointRadius: weightData.map((weight: WeightData) => {
        if (weight.value > maxWeight && maxWeight !== 0) {
          return 6;
        }
        if (weight.value < minWeight && minWeight !== 0) {
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
    pointRadius: 0,
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

  //find sleep periods that overlap, and adjust their xMax to the start of the next sleep period
  for (let i = 0; i < annotations.length; i++) {
    if (i < annotations.length - 1) {
      if (annotations[i].xMax > annotations[i + 1].xMin) {
        annotations[i].xMax = annotations[i + 1].xMin;
      }
    }
  }

  //find sleep periods that end after eachother but have the same sleep state, and merge them
  for (let i = 0; i < annotations.length; i++) {
    if (i < annotations.length - 1) {
      if (annotations[i].xMax === annotations[i + 1].xMin && annotations[i].backgroundColor === annotations[i + 1].backgroundColor) {
        annotations[i].xMax = annotations[i + 1].xMax;
        annotations.splice(i + 1, 1);
        i--;
      }
    }
  }


  return annotations;
}

export const prepareBloodPressureDatasets = (bloodPressureData: BloodPressureData[]): any => {
  const systolicDataset = [] as any;
  const diastolicDataset = [] as any;

  bloodPressureData.forEach((bloodPressure: BloodPressureData) => {
    systolicDataset.push({
      x: formatDate(bloodPressure.createdAt),
      y: bloodPressure.systolic,
    })
    diastolicDataset.push({
      x: formatDate(bloodPressure.createdAt),
      y: bloodPressure.diastolic,
    })
  })

  const datasets = [{
    label: 'Systolic',
    data: systolicDataset,
    borderColor: 'red',
    backgroundColor: 'red',
    borderWidth: 0,
    yAxisID: 'y-axis-1',
    pointStyle: 'triangle',
    pointRadius: 10,
    pointHitRadius: 30,
  }, {
    label: 'Diastolic',
    data: diastolicDataset,
    borderColor: '#000',
    backgroundColor: 'blue',
    borderWidth: 0,
    yAxisID: 'y-axis-1',
    pointStyle: 'rect',
    pointRadius: 10,
    pointHitRadius: 30,
  }]

  return datasets;
}

export const prepareBloodOxygenDatasets = (bloodOxygenData: BloodOxygenData[], limitValue: number): any => {
  const bloodOxygenDataset = [] as any;
  
  bloodOxygenData.forEach((bloodOxygen: BloodOxygenData) => {
    bloodOxygenDataset.push({
      x: formatDate(bloodOxygen.createdAt),
      y: bloodOxygen.bloodOxygen*100,
    })
  })

  const datasets = [{
    label: 'Blood oxygen',
    data: bloodOxygenDataset,
    borderColor: 'red',
    yAxisID: 'y-axis-1',
    pointRadius: 5,
    pointHitRadius: 30,
    pointBackgroundColor: bloodOxygenData.map((bloodOxygen: BloodOxygenData) => {
      if (bloodOxygen.bloodOxygen * 100 <= limitValue) {
        return '#FFD700';
      }
      return 'red';
    }),
  }]

  console.log(datasets);
  return datasets;
}

export const prepareSleepDurationChart = (sleepLogs: SleepLog[]): any => {
  const sleepDurationDataset = [] as any;

  sleepLogs.forEach((sleep: SleepLog) => {
    sleepDurationDataset.push({
      x: formatDate(sleep.startdate),
      y: sleep.sleepSummary ? sleep.sleepSummary.totalSleepTime : sleep.rawDuration,
    })
  })

  //prepare sleep apneas dataset
  const sleepApneasDataset = [] as any;

  sleepLogs.forEach((sleep: SleepLog) => {
    sleepApneasDataset.push({
      x: formatDate(sleep.startdate),
      y: sleep.sleepSummary ? sleep.sleepSummary.ahi : 0,
    })
  })

  const datasets = [{
    label: 'Sleep duration',
    data: sleepDurationDataset,
    borderColor: 'red',
    backgroundColor: 'red',
    yAxisID: 'y-axis-1',
    pointRadius: 5,
    pointHitRadius: 30,
  },
  {
    label: 'Sleep apneas',
    data: sleepApneasDataset,
    borderColor: 'blue',
    backgroundColor: 'blue',
    yAxisID: 'y-axis-2',
    pointRadius: 5,
    pointHitRadius: 30,
  }]

  return datasets;
}

export const prepareActivityDatasets = (activities: ActivityData[]): any => {
  //return datasets for steps, calories, distance
  const stepsDataset = [] as any;
  const caloriesDataset = [] as any;
  const distanceDataset = [] as any;

  activities.forEach((activity: ActivityData) => {
    stepsDataset.push({
      x: formatDate(activity.createdAt),
      y: activity.steps,
    })
    caloriesDataset.push({
      x: formatDate(activity.createdAt),
      y: activity.calories,
    })
    distanceDataset.push({
      x: formatDate(activity.createdAt),
      y: activity.distance,
    })
  }
  )

  const datasets = [{
    label: 'Steps',
    data: stepsDataset,
    borderColor: 'red',
    backgroundColor: 'red',
    yAxisID: 'y-axis-1',
    pointRadius: 5,
    pointHitRadius: 30,
  },
  {
    label: 'Calories',
    data: caloriesDataset,
    borderColor: 'blue',
    backgroundColor: 'blue',
    yAxisID: 'y-axis-1',
    pointRadius: 5,
    pointHitRadius: 30,
  },
  {
    label: 'Distance',
    data: distanceDataset,
    borderColor: 'green',
    backgroundColor: 'green',
    yAxisID: 'y-axis-1',
    pointRadius: 5,
    pointHitRadius: 30,
  }]
  return datasets;
}