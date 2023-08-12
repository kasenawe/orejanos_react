import { useState, useEffect } from "react";
import Article from "../components/Article";
import Loader from "../components/Loader";
import React from "react";
import axios from "axios";

import "./Articles.css";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_DOMAIN}/articles`,
        });
        setArticles(response.data);
      } catch (error) {
        console.error("Error getting articles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="articles-container">
      {isLoading && <Loader />}
      <h1 className="text-center mt-5 mb-5 articles-text">Publicaciones</h1>
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
