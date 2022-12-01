import IUser from '../interfaces/auth.interface';

interface IGetLocalStorge {
  userInfo?: IUser;
  userToken: string;
}

export const getLocalStorge = (): IGetLocalStorge => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('USER') || '{}');
    const userToken = localStorage.getItem('TOKEN') || '';
    return { userInfo, userToken };
  } catch (error) {
    console.log('error ', error);
    return { userToken: '' };
  }
};

export const setLocalStorge = ({
  token,
  data,
}: {
  token: string;
  data: object;
}): void => {
  try {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USER', JSON.stringify(data));
  } catch (error) {
    console.log('error ', error);
  }
};

export const getToken = (): string | null => localStorage.getItem('TOKEN');
