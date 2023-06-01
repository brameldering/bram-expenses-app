import React from "react";

import Button from "../UI/Button/Button";
import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(context) => {
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
                  <Button onClick={props.onLogout}>Logout</Button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
