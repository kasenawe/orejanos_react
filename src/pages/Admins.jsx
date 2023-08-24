import "./Admins.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import CreateAdminModal from "../components/CreateAdminModal";
import DeleteAdminModal from "../components/DeleteAdminModal";
import EditAdminModal from "../components/EditAdminModal";

function Admins() {
  const admin = useSelector((state) => state.admin);
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [adminIdToDelete, setAdminIdToDelete] = useState(false);
  const [adminIdToEdit, setAdminIdToEdit] = useState(false);
  const [username, setUsername] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        setIsLoading(true);
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_DOMAIN}/api/admin/admins`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        setAdmins(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAdmins();
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

  return (
    <>
      <div className="admins-container">
        <h1 className="text-center mb-5 admins-text">Administrators</h1>
        <img
          src="/img/plus-square-fill.svg"
          alt="add icon"
          className="admins-plus-icon"
          onClick={handleCreateClick}
        />

        {isLoading && <Loader />}
        <table className="table table-dark table-hover ">
          <thead>
            <tr>
              <th scope="col" className="admins-header">
                Username
              </th>
              <th scope="col" className="admins-header">
                Firstname
              </th>
              <th scope="col" className="admins-header">
                Lastname
              </th>
              <th scope="col" className="admins-header">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((adm) => (
                <tr key={adm.id} className="text-center">
                  <td>{adm.username}</td>
                  <td>{adm.firstname}</td>
                  <td>{adm.lastname}</td>
                  {adm.username === "kasenawe" &&
                  admin.username !== "kasenawe" ? (
                    <td> NA </td>
                  ) : adm.username === "kasenawe" ? (
                    <td>
                      <img
                        src="/img/pencil-fill.svg"
                        alt="edit icon"
                        className="me-4 admins-edit-icon"
                        onClick={() => handleEditClick(adm.id)}
                      />
                    </td>
                  ) : (
                    <td>
                      <img
                        src="/img/pencil-fill.svg"
                        alt="edit icon"
                        className="me-4 admins-edit-icon"
                        onClick={() => handleEditClick(adm.id)}
                      />
                      <img
                        src="/img/trash3-fill.svg"
                        alt="delete icon"
                        onClick={() => handleDeleteClick(adm.id)}
                        className="admins-delete-icon"
                      />
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CreateAdminModal
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

export default Admins;
