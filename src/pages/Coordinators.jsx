import "./Coordinators.css";
import CoordinatorsCard from "../components/CoordinatorsCard";

function Coordinators() {
  return (
    <>
      <div className="coordinators-container">
        <h1 className="text-center mb-5 coordinators-text">COORDINADORES</h1>
        <div className="row">
          <CoordinatorsCard
            cardName={"Nicolas Gutierrez"}
            cardJob={"Todoterreno"}
          />
          <CoordinatorsCard
            cardName={"Christian Garcia"}
            cardJob={"Escalador"}
          />
          <CoordinatorsCard
            cardName={"Maximiliano Quintana"}
            cardJob={"Sprinter"}
            imgRoute={"/img/Maximiliano.png"}
            imgAlt={"Maximiliano"}
          />
          <CoordinatorsCard
            cardName={"Santiago Da Silva"}
            cardJob={"Chuparueda"}
            imgRoute={"/img/Santiago.jpg"}
            imgAlt={"Santiago"}
          />
        </div>
      </div>
    </>
  );
}

export default Coordinators;
