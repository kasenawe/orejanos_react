import "./Article.css";

function Article({ articleTitle, imgRoute, imgAlt, articleText }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <h5 className="articles-text">{articleTitle}</h5>
      <img src={imgRoute} alt={imgAlt} className="articles-img" />
      <p className="articles-text">{articleText}</p>
      <div className="separator" />
    </div>
  );
}

export default Article;
