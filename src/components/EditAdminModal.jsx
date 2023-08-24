import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function EditAdminModal({
  showEdit,
  setShowEdit,
  render,
  setRender,
  username,
  setUsername,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  adminIdToEdit,
}) {
  const admin = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setShowEdit(false);
  };

  const editAdmin = async (event) => {
    event.preventDefault();

    if (firstname.trim() === "") {
      alert("Por favor, ingresa un nombre para el admin.");
      return;
    }

    try {
      setIsLoading(true);

      const requestData = {
        username: username,
        firstname: firstname,
        lastname: lastname,
      };

      if (password.trim() !== "") {
        requestData.password = password;
      }

      await axios({
        method: "PATCH",
        url: `${
          import.meta.env.VITE_API_DOMAIN
        }/api/admin/edit/${adminIdToEdit}`,
        data: requestData,

        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);

      handleClose();
    } catch (error) {
      console.error("Error al crear el admin:", error);
      setErrorMessage(
        "Error al crear el admin. Por favor, inténtalo nuevamente."
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
            <h3 className="create-modal-text text-center">Edit admin</h3>
            {errorMessage && (
              <p className="create-modal-error-message">{errorMessage}</p>
            )}
            {isLoading && <Loader />}
            <Form onSubmit={editAdmin}>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Form.Label htmlFor="firstname">Firstame</Form.Label>
              <Form.Control
                type="text"
                id="firstname"
                placeholder="Firstname"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />

              <Form.Label htmlFor="lastname">Lastname</Form.Label>
              <Form.Control
                type="text"
                id="lastname"
                placeholder="Lastname"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}
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

export default EditAdminModal;
