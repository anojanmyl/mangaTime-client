import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { Link, Redirect } from "react-router-dom";
import "../../styles/form.css";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <section className="form-section">
        <header className="headersignin">
          <h1>Welcome back</h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2>Login</h2>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              className="input"
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
              onChange={this.handleChange}
              value={this.state.password}
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </div>

          <button className="btn-submit">Submit</button>
        </form>

        <div className="form-section link">
          <p>Already have an account? </p>
          <Link to="/signup">Register</Link>
        </div>
      </section>
    );
  }
}

export default withRouter(FormSignin);
