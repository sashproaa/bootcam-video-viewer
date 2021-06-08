export interface Video {
  id: number;
  title: string;
  description: string;
  meta: string;
  genre: string[];
  actors: string;
  price: string;
  created_at: string;
  duration: string;
  image: string;
  preview_video: string;
  video_url: string;
  project_id: number;
  subscription: number[];
  paid: boolean;
}
