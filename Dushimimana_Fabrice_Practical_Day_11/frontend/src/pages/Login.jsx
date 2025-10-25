import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
function Login() {
  return (
    <form className="form form--login">
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form__input"
          autoComplete="on"
          placeholder="example@email.com"
          required
        />
      </div>
      <div className="form__group">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          type="password"
          name="password"
          autoComplete="on"
          placeholder="........"
          className="form__input"
          required
        />
      </div>
      <div className="form__group">
        <button className="btn btn--submit">Login</button>
        <p className="form__additional">
          Don't have an account ?<Link to="/signup"> Signup here</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
