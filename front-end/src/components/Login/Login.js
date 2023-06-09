import React, { useState, useReducer, useEffect, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  console.log("emailReducer");
  console.log(state, action);
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  console.log("passwordReducer");
  console.log(state, action);
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const context = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailValidation] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPasswordValidation] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // check validaty of form based on the above extracted emailIsValid and passwordIsValid states
  useEffect(() => {
    console.log("useEffect");
    const timeoutId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    console.log("emailChangeHandler");
    console.log(event.target.value);
    dispatchEmailValidation({ type: "USER_INPUT", val: event.target.value });
    console.log("emailChangeHandler, after dispatchEmailValidation");
  };

  const passwordChangeHandler = (event) => {
    console.log("passwordChangeHandler");
    console.log(event.target.value);
    dispatchPasswordValidation({ type: "USER_INPUT", val: event.target.value });
    console.log("emailChangeHandler, after dispatchPasswordValidation");
  };

  const validateEmailHandler = () => {
    console.log("validateEmailHandler");
    dispatchEmailValidation({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    console.log("validatePasswordHandler");
    dispatchPasswordValidation({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    console.log("submitHandler");
    event.preventDefault();
    if (formIsValid) {
      context.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type='email'
          id='email'
          label='E-Mail'
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type='password'
          id='password'
          label='Password'
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
