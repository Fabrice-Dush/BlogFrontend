/* eslint-disable */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import { toast } from "react-toastify";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=".........."
          className="form__input"
          required
        />
      </div>
      <div className="form__group">
        <label htmlFor="passwordConfirm" className="form__label">
          New Password Confirm
        </label>
        <input
          type="text"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder=".........."
          className="form__input"
          required
        />
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
