import webApi from '../webApiHelper';
import { User } from '../../common/interfaces/UserInterface';
import { timeoutMock } from './timeoutMock';
import { loginMock } from './loginMock';
import { Endpoints } from '../../common/enums/EndpointsEnum';

const endpoint = Endpoints.login;

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserLoginResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  subscription: string;
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
