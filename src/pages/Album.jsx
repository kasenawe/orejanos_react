import { useState, useEffect } from "react";
import React from "react";
import { Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PhotoModal from "./PhotoModal";
import DeleteAlbumModal from "../components/DeleteAlbumModal";
import EditAlbumModal from "../components/EditAlbumModal";
import AddPhotoModal from "../components/AddPhotoModal";
import Loader from "../components/Loader";
import axios from "axios";

import "./Album.css";

function Album() {
  const params = useParams();
  const [album, setAlbum] = useState({});
  const admin = useSelector((state) => state.admin);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameValue, setName] = useState("");
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAlbum = async () => {
      try {
        setIsLoading(true);
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_DOMAIN}/album/${params.name}`,
        });

        if (response.data.album) {
          setAlbum(response.data.album);
          setName(response.data.album.name);
        } else {
          console.log("Album not found");
          navigate("/galeria");
        }
      } catch (error) {
        console.error("Error getting album:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAlbum();
  }, [params.name, render]);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [show, setShow] = useState(null);

  const handlePhotoClick = (photoIndex) => {
    setSelectedPhotoIndex(photoIndex);
    setShow(true);
  };

  const [showDelete, setShowDelete] = useState(null);

  const handleDeleteClick = () => {
    setShowDelete(true);
  };

  const [showEdit, setShowEdit] = useState(false);

  const handleEditAlbum = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    try {
      setIsLoading(true);
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_DOMAIN}/admin/album/edit/${album.id}`,
        data: {
          name: nameValue,
        },
        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);
      console.log(response.data);
      // Actualiza el estado del álbum con el nuevo nombre
      setAlbum((prevAlbum) => ({ ...prevAlbum, name: nameValue }));

      // Opcional: mostrar un mensaje de éxito aquí
    } catch (error) {
      // Manejar el error aquí (puede mostrar un mensaje de error, por ejemplo)
      console.error("Error updating album name:", error);
      setErrorMessage("Error updating album name.");
    } finally {
      setIsLoading(false);
      setShowEdit(true);
    }
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleAddClick = async () => {
    setShowAdd(true);
  };

  return (
    <div className="album-container">
      {isLoading && <Loader />}
      <div className="album-button-container">
        <Link to="/galeria">
          <button className="album-button">VOLVER</button>
        </Link>
        {admin && album && (
          <Link>
            <button
              className="album-btn-delete-2"
              onClick={() => handleDeleteClick()}
            >
              ELIMINAR
            </button>
          </Link>
        )}
      </div>

      {album && admin ? (
        <>
          <h1 className="text-center text-danger">Modo Editor</h1>
          <Form onSubmit={handleEditAlbum} className="album-edit-form gap-2">
            <Form.Label htmlFor="name" className="album-edit-label">
              Cambiar nombre:
            </Form.Label>
            <Form.Control
              type="text"
              id="name"
              value={nameValue}
              onChange={(event) => setName(event.target.value)}
              className="album-edit-input"
            />
            <button type="submit" className="album-button">
              Aplicar
            </button>
            {/* Botón para guardar cambios */}
          </Form>
        </>
      ) : (
        album && (
          <h2 className="text-center gallery-text mt-4 mb-5">{album.name}</h2>
        )
      )}

      <div className="album-photo-grid">
        {admin && (
          <div className="album-new-photo-container" onClick={handleAddClick}>
            <p className="album-plus-icon">+</p>
          </div>
        )}
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
              <DeleteAlbumModal
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                album={album}
              />
              <EditAlbumModal showEdit={showEdit} setShowEdit={setShowEdit} />
              <AddPhotoModal
                showAdd={showAdd}
                setShowAdd={setShowAdd}
                render={render}
                setRender={setRender}
                album={album}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Album;
