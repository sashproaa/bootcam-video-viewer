import webApi from '../webApiHelper';
import { User } from '../../common/interfaces/UserInterface';
import { timeoutMock } from './timeoutMock';
import { userMock } from './userMock';
import { Endpoints } from '../../common/enums/EndpointsEnum';
import { FetchError } from '../../common/interfaces/FetchErrorInterface';

const endpoint = Endpoints.user;

// interface UserRequest extends Omit<User, 'id'> {
//   id?: number;
// }

interface UserResponse extends User {
  error?: FetchError;
}

interface AddUserRequest {
  email: string;
  password1: string;
  password2: string;
}

interface AddUserResponse {
  key: string;
  error?: FetchError;
}

interface LoginUserRequest {
  email: string;
  password: string;
}

interface LoginUserResponse {
  key: string;
  error?: FetchError;
}

interface LogoutUserResponse {
  error?: FetchError;
}

export interface ChangePasswordRequest {
  new_password1: string;
  new_password2: string;
}

export interface ChangePasswordResponse {
  error?: FetchError;
}

export const getUser = async (): Promise<UserResponse> => {
  return await webApi.get(`${endpoint}/user/`);
  // return await timeoutMock(userMock);
};

export const addUser = async (
  request: AddUserRequest,
): Promise<AddUserResponse> => {
  return await webApi.post(`${endpoint}/registration/`, request);
  // return await timeoutMock(userMock);
};

export const updateUser = async (request: User): Promise<UserResponse> => {
  return await webApi.patchh(`${endpoint}/user/`, request);
  // return await timeoutMock(userMock);
};

export const deleteUser = async (id: number): Promise<void> => {
  // return await webApi.delete(`${endpoint}/${id}`);
  return await timeoutMock(null);
};

export const loginUser = async (
  request: LoginUserRequest,
): Promise<LoginUserResponse> => {
  return await webApi.post(`${endpoint}/login/`, request);
  // return await timeoutMock(null);
};

export const logoutUser = async (): Promise<LogoutUserResponse> => {
  return await webApi.get(`${endpoint}/logout/`);
  // return await timeoutMock(null);
};

export const changePassword = async (
  request: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  return await webApi.post(`${endpoint}/password/change/`, request);
  // return await timeoutMock(null);
};
