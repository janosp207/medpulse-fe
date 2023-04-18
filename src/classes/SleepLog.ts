import { formatDate } from '@/utils/helpers'

export enum SleepStates {
  Awake = 0,
  LightSleep = 1,
  DeepSleep = 2,
  REM = 3,
}

type AdditionalProps = {
  [key: string]: any
}

export class SleepData {
  id = 0
  startdate = 0
  enddate = 0
  state = 0 as SleepStates

  constructor(data: Partial<SleepData & AdditionalProps>) {
    this.id = data.id ?? this.id;
    this.startdate = data.startdate ?? this.startdate;
    this.enddate = data.enddate ?? this.enddate;
    this.state = data.state ?? this.state;
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

  get duration(): { hours: number, minutes: number} {
    const startMs = this.startdate * 1000;
    const endMs = this.enddate * 1000;
    const durationInMs = endMs - startMs;
    const durationInMinutes = Math.floor(durationInMs / (1000 * 60));
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
  
    return { hours, minutes };
  }

  get formattedDate(): string {
    return formatDate(this.startdate*1000)
  }
}