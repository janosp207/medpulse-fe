import { API_PATHS } from '@/router';
import axios from '@/utils/axios';

type loginDocorsReturnType = {
  login: any
}

export const useDoctorsLogin = (): loginDocorsReturnType => {
  const login = async (name: string, password: string) => {
    const { data } = await axios.post(API_PATHS.DOCTORS.LOGIN, {
      name,
      password,
    });

    return data;
  }

  return {
    login,
  }
}