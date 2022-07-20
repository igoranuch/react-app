import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/auth/actions";
import Loader from "../../components/loader/loader";

function SignIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignInButton = (event) => {
    event.preventDefault();

    if (password.length >= 3 && password.length <= 20) {
      dispatch(
        loginUser({
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (status === "SUCCESS") {
      navigate("/");
    }
  }, [status, user, token, navigate]);

  if (status === "LOADING") {
    return <Loader />;
  }

  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={handleSignInButton} className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input onChange={handleChange} name="email" type="email" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input onChange={handleChange} name="password" type="password" autoComplete="new-password" required />
        </label>
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
      <span>
        Don't have an account?{" "}
        <Link className="sign-in-form__link" to={"/sign-up"}>
          Sign Up
        </Link>
      </span>
    </main>
  );
}

export default SignIn;
