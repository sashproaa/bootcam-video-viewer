export interface Subscription {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  project_id: number;
  paid: boolean;
  data_end: string;
}
