import Header from "../components/Header";
import "./Home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="text-center mt-2 ">
          <span className="home-welcome">Bienvenidos a la página de </span>
          <span className="home-title">OREJANOS BANDA</span>
        </h1>
        <h3 className="text-center home-text mt-5">
          Grupo de ciclismo recreativo en Montevideo
        </h3>

        <h5 className="home-text mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          similique deleniti soluta asperiores. Numquam sequi, provident ad
          earum magni beatae ducimus. Quidem magnam distinctio odit earum
          voluptatem optio ipsa in nisi ipsum, sequi animi est a at rem
          perspiciatis veritatis qui ea ad, voluptas quis non obcaecati
          blanditiis asperiores nihil! Corrupti, sequi ratione, laborum earum
          asperiores autem quam vel illum, tempore aperiam fugit fuga!
          Perspiciatis autem saepe, recusandae modi corrupti, dicta eligendi ea
          repudiandae, iure omnis quo. Dicta cumque non molestiae fuga quia quae
          nulla possimus. Quisquam sit assumenda esse.
        </h5>
        <div className="separator" />

        <div className="conatiner-fluid">
          <div className="row">
            <h3 className="mb-4 articles-title">Ultimos articulos</h3>
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="articles-text">Lunes de cuestas!</h5>
              <img
                src="/img/article3.jpg"
                alt="article1"
                className="articles-img"
              />
              <p className="articles-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis doloremque animi omnis ratione, officiis ad illum,
                eaque temporibus nesciunt nulla magni assumenda dolorum odio
                alias.
              </p>
              <div className="separator" />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="articles-text">Jueves de resistencia!</h5>
              <img
                src="/img/article2.jpg"
                alt="article1"
                className="articles-img"
              />
              <p className="articles-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis doloremque animi omnis ratione, officiis ad illum,
                eaque temporibus nesciunt nulla magni assumenda dolorum odio
                alias.
              </p>
              <div className="separator" />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="articles-text">Nuevo diseño de Jersey!</h5>
              <img
                src="/img/article1.jpg"
                alt="article1"
                className="articles-img"
              />
              <p className="articles-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis doloremque animi omnis ratione, officiis ad illum,
                eaque temporibus nesciunt nulla magni assumenda dolorum odio
                alias.
              </p>
              <div className="separator" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
