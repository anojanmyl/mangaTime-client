import React from "react";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import "../styles/NavMain.css";
import { NavLink } from "react-router-dom";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="nav">
      <NavLink
        exact
        to="/search"
        className="nav__link"
        activeClassName="nav__link--active"
      >
        <SearchRoundedIcon className="nav__icon" />
        <span className="nav__text">Search</span>
      </NavLink>
      <NavLink
        exact
        to="/"
        className="nav__link"
        activeclassname="nav__link--active"
      >
        <HomeRoundedIcon className="nav__icon" />
        <span className="nav__text">Home</span>
      </NavLink>
      {context.isLoggedIn && (
        <React.Fragment>
          <NavLink
            exact
            to="/profile"
            className="nav__link"
            activeclassname="nav__link--active"
          >
            <AccountCircleRoundedIcon className="nav__icon" />
            <span className="nav__text">Profile</span>
          </NavLink>
          <p
            onClick={handleLogout}
            className="nav__link"
            activeclassname="nav__link--active"
          >
            <ExitToAppRoundedIcon className="nav__icon" />
            <span className="nav__text">Logout</span>
          </p>
        </React.Fragment>
      )}
      {!context.isLoggedIn && (
        <React.Fragment>
          <NavLink
            to="/signin"
            className="nav__link"
            activeclassname="nav__link--active"
          >
            <LockOpenRoundedIcon className="nav__icon" />
            <span className="nav__text">Signin</span>
          </NavLink>
          <NavLink
            to="/signup"
            className="nav__link"
            activeclassname="nav__link--active"
          >
            <CreateRoundedIcon className="nav__icon" />
            <span className="nav__text">Signup</span>
          </NavLink>
        </React.Fragment>
      )}
    </nav>
  );
};

export default withUser(NavMain);
