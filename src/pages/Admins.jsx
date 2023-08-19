import "./Admins.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";

function Admins() {
  const admin = useSelector((state) => state.admin);
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

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

  return (
    <>
      <div className="admins-container">
        <h1 className="text-center mb-5 admins-text">Administrators</h1>
        <img
          src="/img/plus-square-fill.svg"
          alt="add icon"
          className="admins-plus-icon"
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
              admins.map((admin) => (
                <tr key={admin.id} className="text-center">
                  <td>{admin.username}</td>
                  <td>{admin.firstname}</td>
                  <td>{admin.lastname}</td>
                  <td>
                    <img
                      src="/img/pencil-fill.svg"
                      alt="edit icon"
                      className="me-4"
                    />
                    <img src="/img/trash3-fill.svg" alt="delete icon" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admins;
