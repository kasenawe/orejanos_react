import { useState, useEffect } from "react";
import Article from "../components/Article";
import React from "react";
import axios from "axios";

import "./Articles.css";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_DOMAIN}/articles`,
      });
      setArticles(response.data);
    };
    getArticles();
  }, []);

  return (
    <div className="album-container">
      <h1 className="text-center mt-5 mb-5 gallery-text">Articulos</h1>
      <div className="row">
        {articles &&
          articles.map((article) => (
            <Article
              key={article.id}
              name={article.name}
              image={`/img/${article.image}`}
              content={article.content}
            />
          ))}
      </div>
    </div>
  );
}

export default Articles;
