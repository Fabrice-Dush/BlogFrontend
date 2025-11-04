/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import { toast } from "react-toastify";

function EmailVerification() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(
    function () {
      const verifyEmail = async function () {
        try {
          const res = await fetch(`${url}/users/verifyEmail/${token}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          setMessage(data.message);
          toast.success(data.message);
          console.log(data);

          setTimeout(() => {
            navigate("/login");
          }, 2500);
        } catch (err) {
          setMessage(err.message);
          toast.error(err.message);
        }
      };
      if (!token) return;
      verifyEmail();
    },
    [token, navigate]
  );

  return <div className="message-container">{message}</div>;
}

export default EmailVerification;
