import webApi from '../webApiHelper';
import { Endpoints } from '../../common/enums/EndpointsEnum';
import { FetchError } from '../../common/interfaces/FetchErrorInterface';
import { Transaction } from '../../common/interfaces/TransactionInterface';

const endpoint = Endpoints.transaction;

interface TransactionRequest extends Transaction {}

interface TransactionResponse extends Transaction {
  error?: FetchError;
}

interface TransactionsAllResponse {
  count: number;
  results: Transaction[];
  error?: FetchError;
}

export const getAllTransactions = async (): Promise<TransactionsAllResponse> => {
  return await webApi.get(`${endpoint}/list/`);
};
