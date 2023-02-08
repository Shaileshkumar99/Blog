import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  paragraph: String,
  username: {type: String, required: true},
  createdAt: {type: String, required: true},
  likes: {type: Number, required: true}
});

