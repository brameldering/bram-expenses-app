import React, { useContext } from "react";

import Button from "../UI/Button/Button";
import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  const context = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href='/'>Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href='/'>Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <Button onClick={context.onLogout}>Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
