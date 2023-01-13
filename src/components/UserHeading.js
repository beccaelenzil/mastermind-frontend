import LoginForm from "./LoginForm.js";
import Performance from "./Performance.js";
import "./GameHeader.css";

const UserHeading = ({ playNum, email, setEmail, seqNum, performance }) => {
  return (
    <div>
      {email != "" ? (
        <div>
          <h1>Logged in as {email}</h1>
          <button
            onClick={() => {
              setEmail("");
              localStorage.clear();
            }}
          >
            Logout
          </button>
          <Performance performance={performance} />
        </div>
      ) : (
        ""
      )}

      {email == "" && playNum == 0 && seqNum == 0 ? (
        <LoginForm setEmailCallback={setEmail} />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserHeading;
