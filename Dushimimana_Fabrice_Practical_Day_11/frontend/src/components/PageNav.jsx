/* eslint-disable */

import { Link, NavLink } from "react-router-dom";

function PageNav({ user }) {
  return (
    <header className={`header ${user && "user"}`}>
      <Link to="/blogs" className="logo">
        TechBlog
      </Link>
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <NavLink to="/" className="nav__link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs/create" className="nav__link">
              Create post
            </NavLink>
          </li>
          <li>
            {user ? (
              <NavLink to="/logout" className="nav__link">
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav__link">
                Login
              </NavLink>
            )}
          </li>
          {user && (
            <div className="user__container">
              {user.user.name
                .toUpperCase()
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>
          )}
        </ul>
      </nav>
      <button className="menu__btn">
        <ion-icon name="menu-outline" className="menu__btn-icon"></ion-icon>
        <ion-icon name="close-outline" className="menu__btn-icon"></ion-icon>
      </button>
    </header>
  );
}

export default PageNav;
