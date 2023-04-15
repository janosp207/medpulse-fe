import { formatDate } from '@/utils/helpers'

class ActivityData {
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

  get formattedDate() {
    return formatDate(this.createdAt)
  }

  get formattedCalories() {
    //round to two decimal
    this.calories = Math.round(this.calories * 100) / 100
    return `${this.calories} kcal`
  }

  get formattedSteps() {
    return `${this.steps}`
  }

  get formattedDistance() {
    return `${this.distance} m`
  }
}

class BloodOxygenData {
  bloodOxygen = 0
  createdAt = ''
  constructor(data: Partial<BloodOxygenData>) {
    this.bloodOxygen = data.bloodOxygen ?? this.bloodOxygen
    this.createdAt = data.createdAt ?? this.createdAt
  }

  get formattedDate() {
    return formatDate(this.createdAt)
  }

  get formattedBloodOxygen() {
    return `${this.bloodOxygen * 100}%`
  }
}

class BloodPressureData {
  systolic = 0
  diastolic = 0
  createdAt = ''

  constructor(data: Partial<BloodPressureData>) {
    this.systolic = data.systolic ?? this.systolic
    this.diastolic = data.diastolic ?? this.diastolic
    this.createdAt = data.createdAt ?? this.createdAt
  }

  get formattedDate() {
    return formatDate(this.createdAt)
  }

  get formattedBloodPressure() {
    return `${this.systolic}/${this.diastolic}`
  }
}

class WeightData {
  value = 0
  // assign date to createdAt
  date = 0

  constructor(data: Partial<WeightData>) {
    this.value = data.value ?? this.value
    this.date = data.date ?? this.date
  }

  get formattedDate() {
    return formatDate(this.date*1000)
  }
}

class BodyFatData {
  value = 0
  // assign date to createdAt
  date = 0
  
  constructor(data: Partial<BodyFatData>) {
    this.value = data.value ?? this.value
    this.date = data.date ?? this.date
  }

  get formattedDate() {
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