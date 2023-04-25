import { formatDate, getDurationFromTimestamps } from '@/utils/helpers'

export enum SleepStates {
  Awake = 0,
  LightSleep = 1,
  DeepSleep = 2,
  REM = 3,
}

type AdditionalProps = {
  [key: string]: any
}

export class HeartRateData {
  hr = 0
  timestamp = 0

  constructor(data: Partial<HeartRateData & AdditionalProps>) {
    this.hr = data.hr ?? this.hr;
    this.timestamp = data.timestamp ?? this.timestamp;
  }
}

export class SleepData {
  id = 0
  startdate = 0
  enddate = 0
  state = 0 as SleepStates
  heartRates: HeartRateData[] = []

  constructor(data: Partial<SleepData & AdditionalProps>) {
    this.id = data.id ?? this.id;
    this.startdate = data.startdate ?? this.startdate;
    this.enddate = data.enddate ?? this.enddate;
    this.state = data.state ?? this.state;
    this.heartRates = data.heart_rates ? data.heart_rates.map((hr: HeartRateData) => new HeartRateData(hr)) : this.heartRates;
  }
}

export default class SleepLog {
  id = 0
  patientId = 0
  startdate = 0
  enddate = 0

  constructor(data: Partial<SleepLog & AdditionalProps>) {
    this.id = data.id ?? this.id;
    this.patientId = data.patient_id ?? this.patientId;
    this.startdate = data.startdate ?? this.startdate;
    this.enddate = data.enddate ?? this.enddate;
  }

  get rawDuration(): number {
    return this.enddate - this.startdate
  }

  get duration(): { hours: number, minutes: number} {
    return getDurationFromTimestamps(this.startdate, this.enddate)
  }

  get formattedDate(): string {
    return formatDate(this.startdate*1000)
  }
}