import LoginForm from "./LoginForm.js";
import Performance from "./Performance.js";
import "./GameHeader.css";

const UserHeading = ({
  playNum,
  email,
  setEmail,
  seqNum,
  performance,
  gameOver,
}) => {
  return (
    <div>
      {email != "" ? (
        <div>
          <h1 id="logged-in-as">Logged in as {email}</h1>
          <button
            onClick={() => {
              setEmail("");
              localStorage.clear();
            }}
          >
            Logout
          </button>
          <Performance
            performance={performance}
            gameOver={gameOver}
            playNum={playNum}
            seqNum={seqNum}
          />
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
