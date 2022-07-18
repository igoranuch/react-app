import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Briefcase } from "../../assets/images/briefcase.svg";
import { ReactComponent as User } from "../../assets/images/user.svg";

const hiddenNavRoutes = ["/sign-up", "/sign-in"];

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__logo" to="/">
          Travel App
        </Link>

        {!hiddenNavRoutes.includes(location.pathname) && (
          <nav className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item" title="Bookings">
                <Link className="nav-header__inner" to={"/bookings"}>
                  <span className="visually-hidden">Bookings</span>
                  <Briefcase />
                </Link>
              </li>
              <li className="nav-header__item" title="Profile">
                <div className="nav-header__inner profile-nav" tabIndex="0">
                  <span className="visually-hidden">Profile</span>
                  <User />
                  <ul className="profile-nav__list">
                    <li className="profile-nav__item profile-nav__username">John Doe</li>
                    <li className="profile-nav__item">
                      <Link to={"/sign-in"}>
                        <button className="profile-nav__sign-out button">Sign Out</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
