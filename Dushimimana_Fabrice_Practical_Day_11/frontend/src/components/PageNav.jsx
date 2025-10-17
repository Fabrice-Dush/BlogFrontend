// import { Link, NavLink } from "react-router-dom";

import { Link, NavLink } from "react-router-dom";

function PageNav() {
  return (
    <header className="header">
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
