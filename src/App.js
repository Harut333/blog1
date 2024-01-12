// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import "./App.css"; // Import the CSS file

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostAdded = async (newPost) => {
    // Update the state with the new post
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    try {
      // Fetch the updated posts from the server
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="container">
      <Router>
        <header>
          <div className="navbar">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/admin">Admin Panel</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
              <Route path="/" element={<Home posts={posts} />} />
              <Route
                path="/admin"
                element={<AdminPanel onPostAdded={handlePostAdded} />}
              />
            </Routes>
      </Router>
    </div>
  );
}

export default App;
