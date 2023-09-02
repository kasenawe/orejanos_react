import "./ArticlesMgt.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import CreateArticleModal from "../components/CreateArticleModal";
import DeleteAdminModal from "../components/DeleteAdminModal";
import EditAdminModal from "../components/EditAdminModal";

function ArticlesMgt() {
  const admin = useSelector((state) => state.admin);
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [adminIdToDelete, setAdminIdToDelete] = useState(false);
  const [adminIdToEdit, setAdminIdToEdit] = useState(false);
  const [username, setUsername] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_DOMAIN}/articles`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        setArticles(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, [render]);

  const handleCreateClick = () => {
    setShow(true);
  };

  const handleDeleteClick = (adminId) => {
    setShowDelete(true);
    setAdminIdToDelete(adminId);
  };

  const handleEditClick = (adminId) => {
    setShowEdit(true);
    const adminToEdit = admins.find((obj) => obj.id === adminId);
    if (adminToEdit) {
      setAdminIdToEdit(adminId);
      setUsername(adminToEdit.username);
      setFirstname(adminToEdit.firstname);
      setLastname(adminToEdit.lastname);
    }
  };

  const reversedArticles = [...articles].reverse();

  return (
    <>
      <div className="articles-mgt-container">
        <h1 className="text-center mb-5 articles-mgt-text">
          Editor de Publicaciones
        </h1>
        <img
          src="/img/plus-square-fill.svg"
          alt="add icon"
          className="articles-mgt-plus-icon"
          onClick={handleCreateClick}
        />

        {isLoading && <Loader />}
        <table className="table table-dark table-hover ">
          <thead>
            <tr>
              <th scope="col" className="articles-mgt-header">
                Nombre
              </th>
              <th scope="col" className="articles-mgt-header">
                Imagen
              </th>
              <th scope="col" className="articles-mgt-header">
                Contenido
              </th>
              <th scope="col" className="articles-mgt-header">
                Creado
              </th>
              <th scope="col" className="articles-mgt-header">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {reversedArticles &&
              reversedArticles.map((art) => (
                <tr key={art.id} className="text-center">
                  <td>{art.name}</td>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_SUPABASE_IMG_URL}/articles/${
                        art.image
                      }`}
                      className="articles-mgt-image"
                    />
                  </td>
                  <td>{art.content}</td>
                  <td>{art.createdAt}</td>
                  <td>
                    <img
                      src="/img/pencil-fill.svg"
                      alt="edit icon"
                      className="me-4 articles-mgt-edit-icon"
                      onClick={() => handleEditClick(art.id)}
                    />
                    <img
                      src="/img/trash3-fill.svg"
                      alt="delete icon"
                      onClick={() => handleDeleteClick(art.id)}
                      className="articles-mgt-delete-icon"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CreateArticleModal
        show={show}
        setShow={setShow}
        render={render}
        setRender={setRender}
      />
      <DeleteAdminModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        adminIdToDelete={adminIdToDelete}
        render={render}
        setRender={setRender}
      />
      <EditAdminModal
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        render={render}
        setRender={setRender}
        username={username}
        setUsername={setUsername}
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
        adminIdToEdit={adminIdToEdit}
      />
    </>
  );
}

export default ArticlesMgt;
