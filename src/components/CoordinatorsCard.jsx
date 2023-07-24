import "./CoordinatorsCard.css";

function CoordinatorsCard({ cardName, cardJob, imgRoute, imgAlt }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-center mb-4">
      <div className="d-flex flex-column card">
        <img src={imgRoute} alt={imgAlt} className="coord-img" />
      </div>
      <h5 className="coord-card-text mt-2">{cardName}</h5>
      <h5 className="coord-card-text"> {cardJob}</h5>
    </div>
  );
}

export default CoordinatorsCard;
