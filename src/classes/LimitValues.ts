export default class LimitValues {
  weight = 0;
  weightMin = 0;
  fatRatio = 0;
  bmi = 0;
  systolicMax = 0;
  diastolicMax = 0;
  systolicMin = 0;
  diastolicMin = 0;
  bloodOxygenMin = 0;
  sleepDurationMin = 0;

  constructor(data: Partial<LimitValues>) {
    this.weight = data.weight ?? this.weight;
    this.weightMin = data.weightMin ?? this.weightMin;
    this.fatRatio = data.fatRatio ?? this.fatRatio;
    this.bmi = data.bmi ?? this.bmi;
    this.systolicMax = data.systolicMax ?? this.systolicMax;
    this.diastolicMax = data.diastolicMax ?? this.diastolicMax;
    this.systolicMin = data.systolicMin ?? this.systolicMin;
    this.diastolicMin = data.diastolicMin ?? this.diastolicMin;
    this.bloodOxygenMin = data.bloodOxygenMin ?? this.bloodOxygenMin;
    this.sleepDurationMin = data.sleepDurationMin ?? this.sleepDurationMin;
  }

  get hypotensionLimits(): { systolic: number; diastolic: number } {
    return {
      systolic: this.systolicMin,
      diastolic: this.diastolicMin,
    }
  }

  get hypertensionLimits(): { systolic: number; diastolic: number } {
    return {
      systolic: this.systolicMax,
      diastolic: this.diastolicMax,
    }
  }
}