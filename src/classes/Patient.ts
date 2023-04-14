export default class Patient {
  id = '';
  name = 'temp';

  constructor(data: Partial<Patient>) {
    this.id = data.id ?? this.id
    this.name = data.name ?? this.name
  }
}