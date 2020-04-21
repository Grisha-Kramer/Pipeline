import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { AppContext } from "../../libs/contextLib";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

async function handleSubmit(event) {
  event.preventDefault();

  try {
    await Auth.signIn(email, password);
    alert("Logged in");
  } catch (e) {
    alert(e.message);
  }
}

// useEffect(() => {
//   onLoad();
// }, []);

async function onLoad() {
  try {
    await Auth.currentSession();
    userHasAuthenticated(true);
  } catch (e) {
    if (e !== "No current user") {
      alert(e);
    }
  }

  // setIsAuthenticating(false);
}

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bssize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/action-1"></Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        </DropdownButton> */}
        <Button block bssize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
