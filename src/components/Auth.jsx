import React, { Component } from "react";
import { connect } from "react-redux";
import { openAuth, logoutUser } from "../actions/auth";
import C from "../constants";

const Auth = props => {
  switch (props.auth.status) {
    case C.AUTH_LOGGED_IN:
      return (
        <p>
          <span>Logged in as {props.auth.username}.</span>
          {" "}<button onClick={props.logoutUser}>Log out</button>
        </p>
      );
    case C.AUTH_AWAITING_RESPONSE:
      return (
        <p>
          <button disabled>authenticating...</button>
        </p>
      );
    default:
      return (
        <p>
          <button onClick={props.openAuth}>Log in</button>
        </p>
      );
  }
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  openAuth,
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
