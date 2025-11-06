/* eslint-disable */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import { toast } from "react-toastify";
import Svg from "../components/Svg";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState("password");
  const handleSetType = function () {
    setType((type) => (type === "text" ? "password" : "text"));
  };

  const handleSetTypeConfirm = function () {
    setTypeConfirm((typeConfirm) =>
      typeConfirm === "text" ? "password" : "text"
    );
  };

  const handleSubmit = async function (event) {
    try {
      event.preventDefault();
      if (!password.trim() || !passwordConfirm.trim()) return;

      setIsLoading(true);

      const res = await fetch(`${url}/users/resetPassword/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, passwordConfirm }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setIsLoading(false);
      toast.success(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <form className="form form--login" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="password" className="form__label">
          New Password
        </label>
        <input
          type={type}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=".........."
          className="form__input"
          required
        />
        <Svg type={type} onClick={handleSetType} />
      </div>
      <div className="form__group">
        <label htmlFor="passwordConfirm" className="form__label">
          New Password Confirm
        </label>
        <input
          type={typeConfirm}
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder=".........."
          className="form__input"
          required
        />
        <Svg type={typeConfirm} onClick={handleSetTypeConfirm} />
      </div>
      <div className="form__group">
        <button
          className={`btn btn--submit${isLoading ? " loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "sending..." : "send"}
        </button>
      </div>
    </form>
  );
}

export default ResetPassword;
