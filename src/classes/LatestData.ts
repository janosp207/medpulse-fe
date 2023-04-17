import { formatDate } from '@/utils/helpers'

export enum MeasurementType {
  Weight = 1,
  Height = 4,
  FatRatio = 6,
}

export class ActivityData {
  calories = 0
  steps = 0
  distance = 0
  createdAt = ''

  constructor(data: Partial<ActivityData>) {
    this.calories = data.calories ?? this.calories
    this.steps = data.steps ?? this.steps
    this.distance = data.distance ?? this.distance
    this.createdAt = data.createdAt ?? this.createdAt
  }

  get formattedDate():string {
    return formatDate(this.createdAt)
  }

  get formattedCalories():string {
    //round to two decimal
    this.calories = Math.round(this.calories * 100) / 100
    return `${this.calories} kcal`
  }

  get formattedSteps():string {
    return `${this.steps}`
  }

  get formattedDistance():string {
    return `${this.distance} m`
  }
}

export class BloodOxygenData {
  bloodOxygen = 0
  createdAt = ''
  constructor(data: Partial<BloodOxygenData>) {
    this.bloodOxygen = data.bloodOxygen ?? this.bloodOxygen
    this.createdAt = data.createdAt ?? this.createdAt
  }

  get formattedDate():string {
    return formatDate(this.createdAt)
  }

  get formattedBloodOxygen():string {
    return `${this.bloodOxygen * 100}%`
  }
}

export class BloodPressureData {
  systolic = 0
  diastolic = 0
  createdAt = ''

  constructor(data: Partial<BloodPressureData>) {
    this.systolic = data.systolic ?? this.systolic
    this.diastolic = data.diastolic ?? this.diastolic
    this.createdAt = data.createdAt ?? this.createdAt
  }

  get formattedDate():string {
    return formatDate(this.createdAt)
  }

  get formattedBloodPressure():string {
    return `${this.systolic}/${this.diastolic}`
  }
}

export class WeightData {
  value = 0
  date = 0

  constructor(data: Partial<WeightData>) {
    this.value = data.value ?? this.value
    this.date = data.date ?? this.date
  }

  get formattedDate(): string {
    return formatDate(this.date*1000)
  }

  calculateBMI(height: number): number {
    return parseFloat((this.value / (height * height)).toFixed(2))
  }
}

export class BodyFatData {
  value = 0
  // assign date to createdAt
  date = 0
  
  constructor(data: Partial<BodyFatData>) {
    this.value = data.value ?? this.value
    this.date = data.date ?? this.date
  }

  get formattedDate(): string {
    return formatDate(this.date*1000)
  }
}

export class HeightData {
  value = 0
  date = 0

  constructor(data: Partial<HeightData>) {
    this.value = data.value ?? this.value
    this.date = data.date ?? this.date
  }

  get formattedDate(): string {
    return formatDate(this.date*1000)
  }
}
export default class LatestData{
  latestActivity = new ActivityData({})
  latestBloodOxygen = new BloodOxygenData({})
  latestBloodPressure = new BloodPressureData({})
  latestWeight = new WeightData({})
  latestFatRatio = new BodyFatData({})
  bmi = 0

  constructor(data: Partial<LatestData>) {
    this.latestActivity = new ActivityData(data.latestActivity ?? {})
    this.latestBloodOxygen = new BloodOxygenData(data.latestBloodOxygen ?? {})
    this.latestBloodPressure = new BloodPressureData(data.latestBloodPressure ?? {})
    this.latestWeight = new WeightData(data.latestWeight ?? {})
    this.latestFatRatio = new BodyFatData(data.latestFatRatio ?? {})
    this.bmi = data.bmi ?? this.bmi
  }

}