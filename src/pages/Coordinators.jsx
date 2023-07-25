import "./Coordinators.css";
import CoordinatorsCard from "../components/CoordinatorsCard";

function Coordinators() {
  return (
    <>
      <div className="coor-container">
        <h1 className="text-center mb-5 coord-text">COORDINADORES</h1>
        <div className="row">
          <CoordinatorsCard
            cardName={"Nicolas Gutierrez"}
            cardJob={"Titular"}
          />
          <CoordinatorsCard cardName={"Christian Garcia"} cardJob={"Titular"} />
          <CoordinatorsCard
            cardName={"Maximiliano Quintana"}
            cardJob={"Suplente"}
            imgRoute={"/img/Maximiliano.jpeg"}
            imgAlt={"Maximiliano"}
          />
          <CoordinatorsCard
            cardName={"Santiago Da Silva"}
            cardJob={"Suplente"}
            imgRoute={"/img/Santiago.jpg"}
            imgAlt={"Santiago"}
          />
        </div>
      </div>
    </>
  );
}

export default Coordinators;
