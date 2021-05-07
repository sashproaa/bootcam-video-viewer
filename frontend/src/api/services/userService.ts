import webApi from '../webApiHelper';
import { User } from '../../common/interfaces/UserInterface';
import { timeoutMock } from './timeoutMock';
import { userMock } from './userMock';
import { Endpoints } from '../../common/enums/EndpointsEnum';

const endpoint = Endpoints.user;

interface UserRequest extends Omit<User, 'id'> {
  id?: number;
}

interface UserResponse extends User {
  error?: string;
}

export const getUser = async (id: number): Promise<UserResponse> => {
  // return await webApi.get(`${endpoint}/${id}`);
  return await timeoutMock(userMock);
};

export const addVideo = async (request: UserRequest): Promise<UserResponse> => {
  // return await webApi.post(endpoint, request);
  return await timeoutMock(userMock);
};

export const updateUser = async (request: User): Promise<UserResponse> => {
  // return await webApi.put(`${endpoint}/${request.id}`, request);
  return await timeoutMock(userMock);
};

export const deleteUser = async (id: number): Promise<void> => {
  // return await webApi.delete(`${endpoint}/${id}`);
  return await timeoutMock(null);
};
