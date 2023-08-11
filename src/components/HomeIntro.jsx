import "./HomeIntro.css";

function HomeIntro() {
  return (
    <>
      <h1 className="text-center mt-2 ">
        <span className="home-intro-welcome">Bienvenidos a: </span>
        <span className="home-intro-title">OREJANOS BANDA</span>
      </h1>
      <h2 className="home-intro-text text-center mt-4">
        Grupo de ciclismo recreativo en Montevideo
      </h2>
      <h3 className="text-center home-intro-text mt-4">
        "Salimos juntos y llegamos todos juntos"
      </h3>

      <p className="home-intro-text mt-5">
        Somos un grupo de aficionados al ciclismo, abierto a todo el que quiera
        participar. Nos reunimos para disfrutar de salidas recreativas a las que
        te puedes sumar con tu bicicleta de ruta, MTB o gravel. Promovemos el
        deporte y la generación de un clima agradable en el grupo como pilares
        para la salud y el relacionamiento entre los Orejanos. Nuestros valores
        priorizan el compañerismo y solidaridad entre los miembros del grupo,
        por lo que nuestras salidas son abiertas a ciclistas con diversos grados
        de experiencia y entrenamiento, desde principiantes a experimentados.
        Nos esforzamos en asegurar que todos puedan disfrutar nuestras salidas,
        independientemente de su experiencia.
      </p>
      <p className="home-intro-text">
        La seguridad también es nuestra prioridad. El uso de los elementos de
        seguridad (casco y luces), el buen estado general de la bicicleta y de
        sus frenos, así como el total respeto por las reglas de tránsito son
        obligatorios en nuestras salidas.
      </p>
      <p className="home-intro-text">
        Fomentamos un espíritu de comunidad donde todos los participantes puedan
        compartir sus experiencias y motivarse mutuamente para cumplir sus
        objetivos
      </p>
    </>
  );
}

export default HomeIntro;
