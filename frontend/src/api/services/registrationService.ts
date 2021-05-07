import webApi from '../webApiHelper';
import { User } from '../../common/interfaces/UserInterface';

import { registrationMock } from './registrationMock';
import { timeoutMock } from './timeoutMock';

const endpoint = '/registration';

interface UserRegistrationRequest {
  email: string;
  password: string;
}

interface UserRegistrationResponse {
  error?: string;
}

export const registrationUser = async (
  request: UserRegistrationRequest,
): Promise<UserRegistrationResponse> => {
  // return await webApi.post(endpoint, request);
  return await timeoutMock(registrationMock);
};
