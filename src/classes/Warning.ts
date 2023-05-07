export default class Warning {
  type = '';
  value = 0;
  isWithinLimits = false;
  slope = 0;
  isTrendWarning = true;
  text = '';

  constructor(data: Partial<Warning>) {
    this.type = data.type ?? this.type;
    this.value = data.value ?? this.value;
    this.isWithinLimits = data.isWithinLimits ?? this.isWithinLimits;
    this.slope = data.slope ?? this.slope;
    this.isTrendWarning = data.isTrendWarning ?? this.isTrendWarning;
    this.text = data.text ?? this.text;
  }
  
  get title(): string {
    return this.isTrendWarning ? `${this.type} - ${this.isWithinLimits ? 'within limits' : 'out of limits'}` : this.type;
  }

  get warningCountText(): string {
    return 'occured ' + this.value + ' times';
  }

  get warningCountIcon(): string {
    if(this.type === 'wellness') {
      if(this.value < 3) {
        return 'often';
      } else if (this.value < 4) {
        return 'sometimes';
      } else { 
        return 'none';
      }
    }
    if(this.type === 'sleep apnea') {
      if(this.text.includes('Normal')){
        return 'none';
      }
    } 
    if (this.value === 0) {
      return 'none';
    }
    if (this.value > 1 && this.value < 4) {
      return 'sometimes';
    }
    return 'often';
  }

  get warningTrendText(): string {
    if (this.text) {
      return this.text
    }
    if(!this.isTrendWarning) {
      return 'occured ' + this.value + ' times';
    }

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