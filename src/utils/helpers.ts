import { BodyFatData, WeightData } from '@/classes/LatestData';
import LimitValues from '@/classes/LimitValues';

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

export const prepareWeightDatasets = (weightData?: WeightData[], fatRatioData?: BodyFatData[], limitValues?: LimitValues ): any[] => {
  const datasets = []
  const maxWeight = limitValues?.weight || 0;
  const maxBodyFat = limitValues?.fatRatio || 0;

  console.log(limitValues)

  if(weightData) {
    datasets.push({
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
    datasets.push( {
      label: 'Body fat ratio',
      data: fatRatioData.map((fatRatio: BodyFatData) => ({
        x: formatDate(fatRatio.date),
        y: fatRatio.value,
      })),
      borderColor: '#0000FF',
      backgroundColor: '#0000FF',
      yAxisID: 'y-axis-2',
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


  return datasets;
}
