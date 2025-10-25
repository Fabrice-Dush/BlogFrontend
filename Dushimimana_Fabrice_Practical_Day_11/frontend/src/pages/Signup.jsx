/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

function Signup() {
  return (
    <form className="form form--login">
      <div className="form__group">
        <label htmlFor="fullname" className="form__label">
          Fullname
        </label>
        <input
          type="text"
          name="name"
          className="form__input"
          autoComplete="on"
          placeholder="Dios Ella"
          required
        />
      </div>
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
          placeholder="........"
          className="form__input"
          required
        />
      </div>
      <div className="form__group">
        <label htmlFor="passwordConfirm" className="form__label">
          Confirm Password
        </label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="........"
          className="form__input"
          required
        />
      </div>
      <div className="form__group">
        <button className="btn btn--submit">Signup</button>
        <p className="form__additional">
          Already have an account ? <Link to="/login">Login here</Link>
        </p>
      </div>
    </form>
  );
}

export default Signup;
