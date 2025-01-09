import React from 'react'
import  { useState, useEffect } from "react";
import './MovieArtical.css'


export const MovieArtical = () => {
    const [articles, setArticles] = useState([]);

    // Simulating a fetch from a database
    useEffect(() => {
      // Example data fetched from a database
      const fetchArticles = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"); // Example API
        const data = await response.json();
        setArticles(data);
      };
  
      fetchArticles();
    }, []);
  
    return (
      <div className="main-container">
       
  
        {/* Articles Section */}
        <div className="articles-container">
          {articles.map((article) => (
            <div className="article" key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
            </div>
          ))}
        </div>

         {/* Video Section */}
         <div className="video-container">
          <video className="video" controls>
            <source src="sample-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
  )
}
