import Article from "./Article";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import "./HomeArticles.css";

function HomeArticles() {
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
    <div>
      <div className="row">
        <h3 className="mb-4 articles-title">Ultimas noticias</h3>

        {articles &&
          articles
            .slice(0, 6)
            .map((article) => (
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

export default HomeArticles;
