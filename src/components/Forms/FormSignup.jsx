import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Link, Redirect } from "react-router-dom";
import "../../styles/form.css";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log("You already have an account with this email", error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <section className="form-section">
        <header className="header">
          <h1>Hello !</h1>
        </header>
        <form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          className="form"
        >
          <div className="form-group">
            <label className="label" htmlFor="firstName">
              Firstname
            </label>
            <input
              className="input"
              onChange={this.handleChange}
              value={this.state.firstName}
              type="firstName"
              id="firstName"
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Lastname
            </label>
            <input
              className="input"
              onChange={this.handleChange}
              value={this.state.lastName}
              type="lastName"
              id="lastName"
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="nickName">
              Nickname
            </label>
            <input
              className="input"
              onChange={this.handleChange}
              value={this.state.nickName}
              type="nickName"
              id="nickName"
              name="nickName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              id="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              id="password"
              name="password"
            />
          </div>

          <button className="btn-submit">Submit</button>
        </form>
        <div className="form-section link">
          <p>Already have an account? </p>
          <Link to="/signin">Log in</Link>
        </div>
      </section>
    );
  }
}

export default withRouter(FormSignup);
