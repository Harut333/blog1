// src/pages/AdminPanel.js
import React from 'react';
import AddPostForm from '../admin/AddPostForm';

const AdminPanel = ({ onPostAdded }) => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <AddPostForm onPostAdded={onPostAdded} />
    </div>
  );
};

export default AdminPanel;
