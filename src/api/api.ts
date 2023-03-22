import axios from 'axios';
import CryptoJS from 'crypto-js';
import { setUser } from '../actions/users';
import { API } from '../PATHS';
import store from '../store';
import { variables } from './variables';

export default class Api {
  static async get(url: string) {
    return await axios.get(url, { headers: { "Content-Type": "application/json" } });
  }

  static async post(url: string, data: any) {
    return await axios.post(url, data);
  }

  static async put(url: string, data: any) {
    return await axios.put(url, data);
  }

  static async delete(url: string) {
    return await axios.delete(url);
  }

  static async patch(url: string, data: any) {
    return await axios.patch(url, data);
  }

  static async getNonce() {
    const timestamp = Math.floor(Date.now() / 1000);

    const data = "getnonce,"+variables.client_id+","+timestamp;
    const signature = CryptoJS.HmacSHA256(data ,variables.secret.toString());

    const body = {
      action: "getnonce",
      client_id: variables.client_id,
      timestamp: timestamp,
      signature: signature.toString()
    }

    return await this.post(API.WITHINGS.GET_NONCE, body);
  }

  static async getAccessToken(code: string) {
    const body = {
      action: "requesttoken",
      client_id: variables.client_id,
      client_secret: variables.secret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: variables.oauth2_redirect_uri
    }

    const response = await this.post(API.WITHINGS.GET_ACCESS_TOKEN, body);

    if (response.data.body.userid) {
      const user = response.data.body;
      store.dispatch(setUser(user));
    }
    else return;
  }
}