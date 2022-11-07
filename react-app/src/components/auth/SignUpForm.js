import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import validator from "validator";
import "./SignUpForm.css";
const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationError = [];
  useEffect(() => {
    const usernameStr = username.toString().trim();
    const emailStr = email.toString().trim();
    const passwordStr = password.toString().trim();
    const repeatPasswordStr = repeatPassword.toString().trim();
    if (usernameStr.length < 4) {
      validationError.push(
        "Username needs to have at least 4 characters,excluding spaces."
      );
    }
    if (!validator.isEmail(emailStr)) {
      validationError.push("Please provide a valid email");
    }
    if (passwordStr.length < 4) {
      validationError.push(
        "Password needs to have at least 4 characters, excluding leading and trailing spaces."
      );
    }
    if (passwordStr !== repeatPasswordStr)
      validationError.push("Password must match repeat password");

    setErrors(validationError);
  }, [username, email, password, repeatPassword]);

  const onSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length) return;
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    // <form onSubmit={onSignUp}>
    //   <div>
    //     {isSubmitted && (
    //       <div className="signup-errors">
    //         {errors.map((error, ind) => (
    //           <div key={ind}>{error}</div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    //   <div>
    //     <label>User Name</label>
    //     <input
    //       type="text"
    //       name="username"
    //       onChange={updateUsername}
    //       value={username}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       type="text"
    //       name="email"
    //       onChange={updateEmail}
    //       value={email}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       onChange={updatePassword}
    //       value={password}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Repeat Password</label>
    //     <input
    //       type="password"
    //       name="repeat_password"
    //       onChange={updateRepeatPassword}
    //       value={repeatPassword}
    //       required={true}
    //     ></input>
    //   </div>
    //   <button type="submit" disabled={isSubmitted && errors.length > 0}>
    //     Sign Up
    //   </button>
    // </form>

    <form className="signup-form" onSubmit={onSignUp}>
      <div className="create-account">
        <div className="create-acct-text">Create your account</div>
        <div className="registration"> Registration is easy</div>
      </div>

      <div className="signup-container">
        {isSubmitted && (
          <div className="signup-errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        )}

        <div className="signup-body">
          <div className="input-field">
            <label className="input">User Name</label>
            <input
              className="credential"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>
          <div className="input-field">
            <label className="input">Email</label>
            <input
              className="credential"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className="input-field">
            <label className="input">Password</label>
            <input
              className="credential"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className="input-field">
            <label className="input">Repeat Password</label>
            <input
              className="credential"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button
            className="signup-button"
            type="submit"
            disabled={isSubmitted && errors.length > 0}
          >
            Sign Up
          </button>{" "}
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
