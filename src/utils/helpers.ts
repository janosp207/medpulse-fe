import { BodyFatData, WeightData } from '@/classes/LatestData';

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

export const prepareWeightDatasets = (weightData?: WeightData[], fatRatioData?: BodyFatData[] ): any[] => {
  const datasets = []

  if(weightData) {
    datasets.push({
      label: 'Weight',
      data: weightData.map((weight: WeightData) => ({
        x: formatDate(weight.date),
        y: weight.value,
      })),
      borderColor: '#FF0000',
      backgroundColor: '#FF0000',
      fill: false,
      yAxisID: 'y-axis-1',
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
      fill: false,
      yAxisID: 'y-axis-2',
    })
  }


  return datasets;
}
