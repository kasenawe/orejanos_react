import "./ArticlesMgt.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import CreateArticleModal from "../components/CreateArticleModal";
import DeleteArticleModal from "../components/DeleteArticleModal";
import EditArticleModal from "../components/EditArticleModal";

function ArticlesMgt() {
  const admin = useSelector((state) => state.admin);
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(false);
  const [articleIdToEdit, setArticleIdToEdit] = useState(false);
  const [name, setName] = useState(null);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState(null);

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

  const handleDeleteClick = (artId) => {
    setShowDelete(true);
    setArticleIdToDelete(artId);
  };

  const handleEditClick = (artId) => {
    setShowEdit(true);
    const articleToEdit = articles.find((obj) => obj.id === artId);
    if (articleToEdit) {
      setArticleIdToEdit(artId);
      setName(articleToEdit.name);
      setImage(articleToEdit.image);
      setContent(articleToEdit.content);
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
                      onClick={() => handleEditClick(art.id)}
                      className="me-4 articles-mgt-edit-icon"
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
      <DeleteArticleModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        articleIdToDelete={articleIdToDelete}
        render={render}
        setRender={setRender}
      />
      <EditArticleModal
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        render={render}
        setRender={setRender}
        name={name}
        setName={setName}
        image={image}
        setImage={setImage}
        content={content}
        setContent={setContent}
        articleIdToEdit={articleIdToEdit}
      />
    </>
  );
}

export default ArticlesMgt;
