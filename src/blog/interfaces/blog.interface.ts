import { Document } from 'mongoose';

export interface Blog extends Document {
  id: string;
  title: string;
  paragraph: string;
  username: string;
  createdAt: string;
  likes: number;
}
