import webApi from '../webApiHelper';
import { User } from '../../common/interfaces/UserInterface';
import { timeoutMock } from './timeoutMock';
import { userMock } from './userMock';
import { Endpoints } from '../../common/enums/EndpointsEnum';

const endpoint = Endpoints.user;

// interface UserRequest extends Omit<User, 'id'> {
//   id?: number;
// }

interface UserResponse extends User {
  error?: string;
}

interface AddUserRequest {
  email: string;
  password1: string;
  password2: string;
}

interface AddUserResponse {
  key: string;
  error?: string;
}

interface LoginUserRequest {
  email: string;
  password: string;
}

interface LoginUserResponse {
  key: string;
  error?: string;
}

interface LogoutUserResponse {
  error?: string;
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
  // return await webApi.put(`${endpoint}/${request.id}`, request);
  return await timeoutMock(userMock);
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
