export default class Patient {
  user_id = '';
  name = 'temp';

  constructor(data: Partial<Patient>) {
    this.user_id = data.user_id ?? this.user_id
    this.name = data.name ?? this.name
  }
}