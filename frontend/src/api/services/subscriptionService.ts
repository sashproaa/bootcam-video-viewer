import webApi from '../webApiHelper';
import { Subscription } from '../../common/interfaces/SubscriptionInterface';
import { timeoutMock } from './timeoutMock';
import { subscriptionMock } from './subscriptionMock';
import { subscriptionAllMock } from './subscriptionAllMock';
import { Endpoints } from '../../common/enums/EndpointsEnum';

const endpoint = Endpoints.subscription;

interface SubscriptionRequest extends Subscription {}

interface SubscriptionResponse extends Subscription {
  error?: string;
}

type SubscriptionAllResponse = Subscription[];

interface FilterResponse {}

export const getAllSubscriptions = async (): Promise<SubscriptionAllResponse> => {
  // return await webApi.get(endpoint);
  return await timeoutMock(subscriptionAllMock);
};

export const getSubscription = async (
  id: number,
): Promise<SubscriptionResponse> => {
  // return await webApi.get(`${endpoint}/${id}`);
  return await timeoutMock(subscriptionMock);
};

export const addSubscription = async (
  request: SubscriptionRequest,
): Promise<SubscriptionResponse> => {
  // return await webApi.post(endpoint, request);
  return await timeoutMock(subscriptionMock);
};

export const updateSubscription = async (
  request: Subscription,
): Promise<SubscriptionResponse> => {
  // return await webApi.put(`${endpoint}/${request.id}`, request);
  return await timeoutMock(subscriptionMock);
};

export const deleteSubscription = async (id: number): Promise<void> => {
  // return await webApi.delete(`${endpoint}/${id}`);
  return await timeoutMock(null);
};
