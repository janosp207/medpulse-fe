export default class User {
  userid = '';
  refresh_token = '';

  constructor(data: Partial<User>) {
    this.userid = data.userid ?? this.userid;
    this.refresh_token = data.refresh_token ?? this.refresh_token;
  }
}