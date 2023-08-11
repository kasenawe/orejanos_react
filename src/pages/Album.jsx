import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PhotoModal from "./PhotoModal";
import axios from "axios";

import "./Album.css";

function Album() {
  const params = useParams();
  const [album, setAlbum] = useState({});
  const admin = useSelector((state) => state.admin);
  const [render, setRender] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAlbum = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_DOMAIN}/album/${params.name}`,
      });
      setAlbum(response.data.album);
    };
    getAlbum();
  }, [render]);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [show, setShow] = useState(null);

  const handlePhotoClick = (photoIndex) => {
    setSelectedPhotoIndex(photoIndex);
    setShow(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_DOMAIN}/admin/album/${album.id}`,

        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);
    } catch (error) {
      console.error("Error al eliminar el álbum:", error);
      setErrorMessage(
        "Error al eliminar el álbum. Por favor, inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
      navigate("/galeria");
    }
  };

  return (
    <div className="album-container">
      <div className="album-button-container">
        <Link to="/galeria">
          <button className="album-button">VOLVER</button>
        </Link>
        {admin && album && (
          <Link>
            <button
              className="album-btn-delete-2"
              onClick={() => handleDelete()}
            >
              ELIMINAR
            </button>
          </Link>
        )}
      </div>

      {album && (
        <h2 className="text-center gallery-text mt-4 mb-5">{album.name}</h2>
      )}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <svg
              className="loader"
              viewBox="0 0 48 30"
              width="48px"
              height="30px"
            >
              <g
                fill="none"
                stroke="#1bfd9c"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              >
                <g transform="translate(9.5,19)">
                  <circle
                    className="loader_tire"
                    r="9"
                    strokeDasharray="56.549 56.549"
                  ></circle>
                  <g
                    className="loader_spokes-spin"
                    strokeDasharray="31.416 31.416"
                    strokeDashoffset="-23.562"
                  >
                    <circle className="loader_spokes" r="5"></circle>
                    <circle
                      className="loader_spokes"
                      r="5"
                      transform="rotate(180,0,0)"
                    ></circle>
                  </g>
                </g>
                <g transform="translate(24,19)">
                  <g
                    className="loader_pedals-spin"
                    strokeDasharray="25.133 25.133"
                    strokeDashoffset="-21.991"
                    transform="rotate(67.5,0,0)"
                  >
                    <circle className="loader_pedals" r="4"></circle>
                    <circle
                      className="loader_pedals"
                      r="4"
                      transform="rotate(180,0,0)"
                    ></circle>
                  </g>
                </g>
                <g transform="translate(38.5,19)">
                  <circle
                    className="loader_tire"
                    r="9"
                    strokeDasharray="56.549 56.549"
                  ></circle>
                  <g
                    className="loader_spokes-spin"
                    strokeDasharray="31.416 31.416"
                    strokeDashoffset="-23.562"
                  >
                    <circle className="loader_spokes" r="5"></circle>
                    <circle
                      className="loader_spokes"
                      r="5"
                      transform="rotate(180,0,0)"
                    ></circle>
                  </g>
                </g>
                <polyline
                  className="loader_seat"
                  points="14 3,18 3"
                  strokeDasharray="5 5"
                ></polyline>
                <polyline
                  className="loader_body"
                  points="16 3,24 19,9.5 19,18 8,34 7,24 19"
                  strokeDasharray="79 79"
                ></polyline>
                <path
                  className="loader_handlebars"
                  d="m30,2h6s1,0,1,1-1,1-1,1"
                  strokeDasharray="10 10"
                ></path>
                <polyline
                  className="loader_front"
                  points="32.5 2,38.5 19"
                  strokeDasharray="19 19"
                ></polyline>
              </g>
            </svg>
          </div>
        </div>
      )}
      <div className="album-photo-grid">
        {album &&
          album.images &&
          album.images.map((img, index) => (
            <React.Fragment key={index}>
              <div
                className="album-photo-thumbnail-container"
                onClick={() => setShow(true)}
              >
                <img
                  src={`${import.meta.env.VITE_SUPABASE_IMG_URL}${img.src}`}
                  alt={img.alt}
                  onClick={() => handlePhotoClick(index)}
                  className="album-photo-thumbnail-img"
                />
                <div className="img-caption">{img.alt}</div>
              </div>

              <PhotoModal
                key={`modal-${index}`}
                show={show}
                setShow={setShow}
                images={album.images} // Pasar todas las imágenes del álbum a PhotoModal
                selectedPhotoIndex={selectedPhotoIndex}
                setSelectedPhotoIndex={setSelectedPhotoIndex}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Album;
