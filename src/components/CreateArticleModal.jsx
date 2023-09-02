import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function CreateArticleModal({ show, setShow, render, setRender }) {
  const admin = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageValue, setImage] = useState([]);
  const [nameValue, setName] = useState("");
  const [contentValue, setContent] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const createArticle = async (event) => {
    event.preventDefault();

    if (nameValue.trim() === "") {
      alert("Por favor, ingresa un nombre para la publicación.");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", nameValue);
      formData.append("image", imageValue);
      formData.append("content", contentValue);

      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_DOMAIN}/api/article`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);

      handleClose();
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      setErrorMessage(
        "Error al crear la publicación. Por favor, inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
      setRender(render + 1);
    }
  };

  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="create-modal-body">
          <div className="close-button" onClick={handleClose}>
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="create-modal-content">
            <h3 className="create-modal-text text-center">Crear publicacion</h3>
            {errorMessage && (
              <p className="create-modal-error-message">{errorMessage}</p>
            )}
            {isLoading && <Loader />}
            <Form onSubmit={createArticle} encType="multipart/form-data">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                placeholder="Nombre"
                onChange={(event) => setName(event.target.value)}
              />
              <Form.Label htmlFor="image">Imagen</Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="image"
                placeholder="image"
                onChange={(event) => setImage(event.target.files[0])}
              />
              <Form.Label htmlFor="content">Contenido</Form.Label>
              <Form.Control
                type="text"
                id="content"
                name="content"
                placeholder="Contenido"
                onChange={(event) => setContent(event.target.value)}
              />

              <div className="d-flex gap-4">
                <button
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                  className="create-modal-btn"
                >
                  Cerrar
                </button>

                <button
                  type="submit"
                  variant="primary"
                  className="create-modal-btn"
                >
                  Crear
                </button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateArticleModal;
