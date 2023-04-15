export default class Patient {
  user_id = '';
  name = '';
  date_of_birth = 0;

  constructor(data: Partial<Patient>) {
    this.user_id = data.user_id ?? this.user_id
    this.name = data.name ?? this.name
    this.date_of_birth = data.date_of_birth ?? this.date_of_birth
  }

  get age(): number {
    const dob = new Date(this.date_of_birth);
    const now = new Date();

    const diff = now.getTime() - dob.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    return age;
  }
}