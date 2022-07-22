import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Briefcase } from "../../assets/images/briefcase.svg";
import { ReactComponent as User } from "../../assets/images/user.svg";
import { useSelector, useDispatch } from "react-redux";
import { authRoutes } from "../../common/authRoutes";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { logOut } from "../../store/auth/reducer";

type HeaderProps = {
  isAuth: boolean;
  signOut: () => void;
};

const Header: React.FC<HeaderProps> = ({ signOut, isAuth }) => {
  const [username, setUsername] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (user) setUsername(user.fullName);
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
    signOut();
    navigate("/sign-in");
  };

  const handleLogoClick = () => {
    if (isAuth) {
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="header__inner">
        <span onClick={handleLogoClick} className="header__logo">
          Travel App
        </span>

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
                      <button onClick={handleLogout} className="profile-nav__sign-out button">
                        Sign Out
                      </button>
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
};

export default Header;
