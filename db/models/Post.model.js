import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
