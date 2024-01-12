// Home.js
import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostAdded = async (newPost) => {
    // Update the state with the new post
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    try {
      // Fetch the updated posts from the server
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

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
    <div className="blogContent">
      <h1>Digitain Blog</h1>
      <PostList posts={posts} onDelete={handleDelete} fetchPosts={fetchPosts} />
    </div>
  );
};

export default Home;
