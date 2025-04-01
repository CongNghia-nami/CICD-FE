import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { postRegisterUser } from "../service/apiService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Perform all DOM reads first
    const emailValue = email;
    const passwordValue = password;
    const usernameValue = username;

    let res = await postRegisterUser(emailValue, usernameValue, passwordValue);
    console.log("check ", res);
  };
  return (
    <>
      <div className="container">
        <div className="showQuestion">Don't have an account yet</div>
        <div className="showName">Cong Nghia IT</div>

        <form className="formLogin" onSubmit={handleRegister}>
          <label className="mt-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="desingInput"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label className="mt-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="desingInput"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <label className="mt-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="desingInput"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <span className="forgot">Forgot password?</span>
          <button
            type="submit"
            className="btn btn-secondary mt-2"
            // onClick={() => {
            //   //   navigate("/logins");
            // }}
          >
            Register
          </button>
          <div>
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Go to Page
            </span>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
