import "./CoordinatorsCard.css";

function CoordinatorsCard({ cardName, cardJob, imgRoute, imgAlt }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-center mb-4">
      <div className="d-flex flex-column justify-content-start coord-card">
        <div className="coord-card-avatar">
          <img src={imgRoute} alt={imgAlt} className="coord-card-img" />
        </div>

        <div className="w-100 border-bottom">
          <h5 className="coord-card-text mt-2">{cardName}</h5>
        </div>
        <div className="w-100 border-bottom">
          <h5 className="coord-card-text"> {cardJob}</h5>
        </div>
        <div className="d-flex flex-column justify-content-center mt-1">
          <img src="/img/instagram.svg" alt="instagram icon" />
        </div>
      </div>
    </div>
  );
}

export default CoordinatorsCard;
