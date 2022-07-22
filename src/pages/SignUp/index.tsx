import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../store/auth/actions";
import Loader from "../../components/Loader";
import { AppDispatch, RootState } from "../../store/store";
import { StateStatus } from "../../types/index";
import { reset } from "../../store/auth/reducer";

function SignUp() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = userData;

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUpButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length >= 3 && password.length <= 20) {
      dispatch(
        registerUser({
          fullName,
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (status === StateStatus.SUCCESS) {
      navigate("/");
      dispatch(reset());
    }
  }, [status, navigate, dispatch]);

  if (status === StateStatus.LOADING) {
    return <Loader />;
  }

  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={handleSignUpButton} className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Full name</span>
          <input onChange={handleChange} name="fullName" type="text" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input onChange={handleChange} name="email" type="email" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input onChange={handleChange} name="password" type="password" autoComplete="new-password" required />
        </label>
        <button className="button" type="submit">
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?{" "}
        <Link className="sign-up-form__link" to={"/sign-in"}>
          Sign In
        </Link>
      </span>
    </main>
  );
}

export default SignUp;
