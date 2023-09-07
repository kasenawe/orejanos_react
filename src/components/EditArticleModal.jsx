import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function EditArticleModal({
  showEdit,
  setShowEdit,
  render,
  setRender,
  name,
  setName,
  image,
  setImage,
  content,
  setContent,
  articleIdToEdit,
}) {
  const admin = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setShowEdit(false);
  };

  const editArticle = async (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      alert("Por favor, ingresa un nombre para la publicacion.");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);
      formData.append("content", content);
      console.log(image);

      await axios({
        method: "PATCH",
        url: `${
          import.meta.env.VITE_API_DOMAIN
        }/api/article/edit/${articleIdToEdit}`,
        data: formData,

        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);

      handleClose();
    } catch (error) {
      console.error("Error al editar la publicacion:", error);
      setErrorMessage(
        "Error al editar la publicacion. Por favor, inténtalo nuevamente."
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
        show={showEdit}
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
            <h3 className="create-modal-text text-center">
              Editar publicacion
            </h3>
            {errorMessage && (
              <p className="create-modal-error-message">{errorMessage}</p>
            )}
            {isLoading && <Loader />}
            <Form onSubmit={editArticle} encType="multipart/form-data">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Form.Label htmlFor="image">Imagen</Form.Label>
              <Form.Control
                type="file"
                id="image"
                onChange={(event) => setImage(event.target.files[0])}
              />

              <Form.Label htmlFor="content">Contenido</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                id="content"
                placeholder="content"
                value={content}
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
                  Aplicar
                </button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditArticleModal;
