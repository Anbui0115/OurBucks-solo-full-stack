import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const emailStr = email.toString().trim();
    const passwordStr = password.toString().trim();
    let errors = [];

    if (emailStr.length < 1)
      errors.push(
        "Please enter your username or email, excluding leading and trailing spaces."
      );
    if (passwordStr.length < 1) errors.push("Please enter your password");

    setErrors(errors);
  }, [email, password]);

  const onLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleDemoUser = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className="login-form" onSubmit={onLogin}>
      <div className="sign-in-and-register">
        <div className="login-text-container">
          <h1 className="text-login">Sign in</h1>
        </div>
      </div>

      <div className="login-container">
        <div className="login-errors">
          {submitted &&
            errors.map((error, ind) => <div key={ind}>{error}</div>)}
        </div>

        <div className="login-body">
          <div className="input-field">
            <label className="input" htmlFor="email">
              Email address
            </label>
            <input
              className="credential"
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
              required
            />
          </div>

          <div className="input-field">
            <label className="input" htmlFor="password">
              Password
            </label>
            <input
              className="credential"
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
              required
            />
          </div>
          <button
            className="login-button"
            type="submit"
            // disabled={submitted && errors.length > 0}
          >
            Sign in
          </button>
          <button
            className="demo-user-button login-button"
            onClick={handleDemoUser}
          >
            Demo User
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
