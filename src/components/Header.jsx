import Carousel from "react-bootstrap/Carousel";
import "./Header.css";

function Header() {
  return (
    <>
      <div>
        <Carousel className="col-12 headerContainer">
          <Carousel.Item>
            <div
              className="d-block headerContainer"
              style={{
                backgroundImage: `url(/img/header1.jpg)`,

                backgroundRepeat: "no-repeat",
                backgroundAttachment: "static",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-block headerContainer"
              style={{
                backgroundImage: `url(/img/header2.jpg)`,

                backgroundRepeat: "no-repeat",
                backgroundAttachment: "static",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-block headerContainer"
              style={{
                backgroundImage: `url(/img/header3.jpg)`,

                backgroundRepeat: "no-repeat",
                backgroundAttachment: "static",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-block headerContainer"
              style={{
                backgroundImage: `url(/img/header4.jpg)`,

                backgroundRepeat: "no-repeat",
                backgroundAttachment: "static",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            ></div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default Header;
