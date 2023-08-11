import "./Article.css";

function Article({ name, image, content }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <h5 className="article-text">{name}</h5>
      <img src={image} className="article-img" />
      <p className="article-text">{content}</p>
      <div className="article-separator" />
    </div>
  );
}

export default Article;
