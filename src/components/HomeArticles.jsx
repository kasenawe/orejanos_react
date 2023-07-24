import Article from "./Article";
import "./HomeArticles.css";

function HomeArticles() {
  return (
    <div>
      <div className="row">
        <h3 className="mb-4 articles-title">Ultimos articulos</h3>
        <Article
          articleTitle={"Lunes de cuestas!"}
          imgRoute={"/img/article3.jpg"}
          imgAlt={"article3"}
          articleText={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloremque animi omnis ratione, officiis ad illum, eaque temporibus nesciunt nulla magni assumenda dolorum odio alias."
          }
        />
        <Article
          articleTitle={"Jueves de fuerza!"}
          imgRoute={"/img/article2.jpg"}
          imgAlt={"article2"}
          articleText={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloremque animi omnis ratione, officiis ad illum, eaque temporibus nesciunt nulla magni assumenda dolorum odio alias."
          }
        />
        <Article
          articleTitle={"Nueva Jersey!"}
          imgRoute={"/img/article1.jpg"}
          imgAlt={"article1"}
          articleText={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloremque animi omnis ratione, officiis ad illum, eaque temporibus nesciunt nulla magni assumenda dolorum odio alias."
          }
        />
      </div>
    </div>
  );
}

export default HomeArticles;
