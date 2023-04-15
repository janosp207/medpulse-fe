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

export default class LatestData{
  latestActivity = new ActivityData({})
  latestBloodOxygen = new BloodOxygenData({})
  latestBloodPressure = new BloodPressureData({})

  constructor(data: Partial<LatestData>) {
    this.latestActivity = new ActivityData(data.latestActivity ?? {})
    this.latestBloodOxygen = new BloodOxygenData(data.latestBloodOxygen ?? {})
    this.latestBloodPressure = new BloodPressureData(data.latestBloodPressure ?? {})
  }

}