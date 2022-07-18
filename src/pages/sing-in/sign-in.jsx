import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const handleSignInButton = (event) => {
    event.preventDefault();

    const password = event.target.password.value;

    if (password.length >= 3 && password.length <= 20) {
      navigate("/");
    }
  };

  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={handleSignInButton} className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input name="email" type="email" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input name="password" type="password" autoComplete="new-password" required />
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
