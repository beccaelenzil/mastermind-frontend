import React, { useState } from "react";
import "./ThemeSelect.css";

const LoginForm = ({ setEmailCallback }) => {
  const [email, setEmail] = useState("");

  const submitEmail = (e) => {
    e.preventDefault();

    setEmailCallback(email);
    localStorage.setItem("email", email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form onSubmit={submitEmail}>
      <section>
        <div>
          <label id="label" htmlFor="email">
            {"Enter a username to track your results "}
          </label>
          <input
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          <button className="button new-dog__submit" type="submit">
            Login
          </button>
        </div>
      </section>
    </form>
  );
};

export default LoginForm;
