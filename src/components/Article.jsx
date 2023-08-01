import "./Article.css";

function Article({ name, image, content }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <h5 className="articles-text">{name}</h5>
      <img src={image} className="articles-img" />
      <p className="articles-text">{content}</p>
      <div className="separator" />
    </div>
  );
}

export default Article;
