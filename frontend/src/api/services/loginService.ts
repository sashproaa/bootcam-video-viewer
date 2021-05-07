import webApi from '../webApiHelper';
import { User } from '../../common/interfaces/UserInterface';
import { timeoutMock } from './timeoutMock';
import { loginMock } from './loginMock';

const endpoint = '/login';

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserLoginResponse {
  user: User;
  token: string;
  message: string;
  error?: string;
}

export const loginUser = async (
  request: UserLoginRequest,
): Promise<UserLoginResponse> => {
  // return await webApi.post(endpoint, request);
  return await timeoutMock(loginMock);
};
