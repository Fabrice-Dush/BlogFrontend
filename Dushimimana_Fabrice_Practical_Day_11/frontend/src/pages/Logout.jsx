/* eslint-disable */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(function () {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }, []);
}

export default Logout;
