export default class Warning {
  type = '';
  value = '';
  isWithinLimits = false;
  slope = 0;

  constructor(data: Partial<Warning>) {
    this.type = data.type ?? this.type;
    this.value = data.value ?? this.value;
    this.isWithinLimits = data.isWithinLimits ?? this.isWithinLimits;
    this.slope = data.slope ?? this.slope;
  }

  get warningLimitText(): string {
    return this.isWithinLimits ? 'within limit' : 'outside limit';
  }

  get warningTrendText(): string {
    //stable
    if (this.slope > -0.1 && this.slope < 0.1) {
      return 'stable';
    }

    //rising
    if (this.slope > 0.1 && this.slope < 0.3) {
      return 'rising';
    }

    if (this.slope > 0.3) {
      return 'rapidly rising';
    }

    //falling
    if (this.slope < -0.1 && this.slope > -0.3) {
      return 'falling';
    }

    if (this.slope < -0.3) {
      return 'rapidly falling';
    }

    return '';
  }
}