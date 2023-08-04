import "./HomeIntro.css";

function HomeIntro() {
  return (
    <>
      <h1 className="text-center mt-2 ">
        <span className="home-welcome">Bienvenidos a la página de: </span>
        <span className="home-title">OREJANOS BANDA</span>
      </h1>
      <h2 className="home-text text-center mt-4">
        Grupo de ciclismo recreativo en Montevideo
      </h2>
      <h3 className="text-center home-text mt-4">
        "Salimos juntos y llegamos todos separados"
      </h3>

      <p className="home-text mt-5">
        Somos una comunidad entusiasta de ciclismo recreativo nos reunimos para
        disfrutar de salidas en forma no competitiva. Promovemos el deporte y el
        compañerismo por lo tanto nuestras salidas son abiertas a ciclistas
        principiantes tanto como experimentados, asegurando que todos los
        participantes puedan disfrutar la experiencia según sus habilidades
      </p>
      <p className="home-text">
        La seguridad es una prioridad fomentamos el uso de protección
        establecido y el respeto por las reglas de transito durante el recorrido
      </p>
      <p className="home-text">
        Fomentamos un espíritu de comunidad donde todos los participantes puedan
        compartir sus experiencias y motivarse mutuamente para cumplir sus
        objetivos
      </p>
    </>
  );
}

export default HomeIntro;
