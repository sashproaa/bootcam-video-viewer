import webApi from '../webApiHelper';
import { User } from '../../common/interfaces/UserInterface';
import { Endpoints } from '../../common/enums/EndpointsEnum';
import { FetchError } from '../../common/interfaces/FetchErrorInterface';

const endpoint = Endpoints.user;

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

export interface UserMediaRequest extends Omit<User, 'avatar'> {
  avatar: Blob;
}

export const getUser = async (): Promise<UserResponse> => {
  const response = await webApi.get(`${endpoint}/user/`);
  response.history = JSON.parse(response.last_name || '{}') || {};
  return response;
};

export const addUser = async (
  request: AddUserRequest,
): Promise<AddUserResponse> => {
  return await webApi.post(`${endpoint}/registration/`, request);
};

export const updateUser = async (request: User): Promise<UserResponse> => {
  const user = { ...request };
  user.date_of_birth = request.date_of_birth
    ? new Date(request.date_of_birth).toISOString().split('T')[0]
    : request.date_of_birth;

  // #########
  user.last_name = JSON.stringify(request.history);
  delete user.history;
  // #########
  return await webApi.patchh(`${endpoint}/user/`, user);
};

export const updateMedia = async (
  request: UserMediaRequest,
): Promise<UserResponse> => {
  return await webApi.formPatch(`${endpoint}/user/`, request);
};

export const deleteUser = async (id: number): Promise<void> => {
  return await webApi.delete(`${endpoint}/${id}`);
};

export const loginUser = async (
  request: LoginUserRequest,
): Promise<LoginUserResponse> => {
  return await webApi.post(`${endpoint}/login/`, request);
};

export const logoutUser = async (): Promise<LogoutUserResponse> => {
  return await webApi.get(`${endpoint}/logout/`);
};

export const changePassword = async (
  request: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  return await webApi.post(`${endpoint}/password/change/`, request);
};
