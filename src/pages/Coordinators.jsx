import "./Coordinators.css";
import CoordinatorsCard from "../components/CoordinatorsCard";

function Coordinators() {
  return (
    <>
      <div className="coor-container">
        <h1 className="text-center mb-5 coord-text">COORDINADORES</h1>
        <div className="row">
          <CoordinatorsCard
            cardName={"Maximiliano"}
            cardJob={"Suplente"}
            imgRoute={"/img/Maximiliano.jpeg"}
            imgAlt={"Maximiliano"}
          />
          <CoordinatorsCard cardName={"Nicolas"} cardJob={"Titular"} />
          <CoordinatorsCard cardName={"Christian"} cardJob={"Titular"} />
          <CoordinatorsCard
            cardName={"Santiago"}
            cardJob={"Suplente"}
            imgRoute={"/img/Santiago.jpg"}
            imgAlt={"Santiago"}
          />
          <div className="separator" />
        </div>
      </div>
    </>
  );
}

export default Coordinators;
