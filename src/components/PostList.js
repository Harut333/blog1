// PostList.js
import React from 'react';
import axios from 'axios';

const PostList = ({ posts, onDelete, fetchPosts }) => {
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      // Fetch the updated posts from the server after deletion
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.imagePath && <img src={`http://localhost:5000/${post.imagePath}`} alt={post.title} />}
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
