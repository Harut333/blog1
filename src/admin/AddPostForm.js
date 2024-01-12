// src/admin/AddPostForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddPostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/posts', formData);

      onPostAdded(response.data);

      setTitle('');
      setContent('');
      setImage(null);
      setError(null); // Clear any previous errors
    } catch (error) {
      // Check the specific error status for different handling
      if (error.response) {
        // The request was made, but the server responded with an error
        setError(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made, but no response was received
        setError('No response from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} required />
      </label>
      <br />
      <label>
        Content:
        <textarea value={content} onChange={handleContentChange} required />
      </label>
      <br />
      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <br />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPostForm;
