import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUpButton = (event) => {
    event.preventDefault();

    const password = event.target.password.value;

    if (password.length >= 3 && password.length <= 20) {
      navigate("/");
    }
  };

  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={handleSignUpButton} className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Full name</span>
          <input name="full-name" type="text" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input name="email" type="email" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input name="password" type="password" autoComplete="new-password" required />
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
