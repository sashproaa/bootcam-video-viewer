import { VideoContent } from './VideoContentInterface';

export interface Transaction {
  // id: number;
  hash: string;
  user_id: number;
  title: string;
  status: 'AC' | 'P' | 'US';
  price: string;
  project_id: number;
  json_description: string;
  created_at: string;
  videocontent: VideoContent[];
}
