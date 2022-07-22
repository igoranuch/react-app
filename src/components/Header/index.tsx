import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Briefcase } from "../../assets/images/briefcase.svg";
import { ReactComponent as User } from "../../assets/images/user.svg";
import { useSelector } from "react-redux";
import { authRoutes } from "../../common/authRoutes";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";

function Header() {
  const [username, setUsername] = useState("");
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) setUsername(user.fullName);
  }, [user]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__logo" to="/">
          Travel App
        </Link>

        {!authRoutes.includes(location.pathname) && (
          <nav className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item" title="Bookings">
                <Link className="nav-header__inner" to={"/bookings"}>
                  <span className="visually-hidden">Bookings</span>
                  <Briefcase />
                </Link>
              </li>
              <li className="nav-header__item" title="Profile">
                <div className="nav-header__inner profile-nav" tabIndex={0}>
                  <span className="visually-hidden">Profile</span>
                  <User />
                  <ul className="profile-nav__list">
                    <li className="profile-nav__item profile-nav__username">{username}</li>
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
