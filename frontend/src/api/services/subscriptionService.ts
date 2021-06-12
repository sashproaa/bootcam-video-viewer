import webApi from '../webApiHelper';
import { Subscription } from '../../common/interfaces/SubscriptionInterface';
import { Endpoints } from '../../common/enums/EndpointsEnum';
import { FetchError } from '../../common/interfaces/FetchErrorInterface';

const endpoint = Endpoints.subscription;

interface SubscriptionRequest extends Subscription {}

interface SubscriptionResponse extends Subscription {
  error?: FetchError;
}

interface SubscriptionAllResponse {
  count: number;
  results: Subscription[];
  error?: FetchError;
}

export const getAllSubscriptions = async (): Promise<SubscriptionAllResponse> => {
  return await webApi.get(`${endpoint}/`);
};

export const getSubscription = async (
  id: number,
): Promise<SubscriptionResponse> => {
  return await webApi.get(`${endpoint}/${id}`);
};

export const addSubscription = async (
  request: SubscriptionRequest,
): Promise<SubscriptionResponse> => {
  return await webApi.post(endpoint, request);
};

export const updateSubscription = async (
  request: Subscription,
): Promise<SubscriptionResponse> => {
  return await webApi.put(`${endpoint}/${request.id}`, request);
};

export const deleteSubscription = async (id: number): Promise<void> => {
  return await webApi.delete(`${endpoint}/${id}`);
};
