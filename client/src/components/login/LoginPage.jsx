import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/users";
import LoginForm from "./LoginForm";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

class LoginPage extends PureComponent {
  handleSubmit = data => {
    this.props.login(data.email, data.password);
  };

  componentDidMount() {
    this.handleSubmit({
      email: "gosia@test.com",
      password: "test12345"
    });
  }

  render() {
    if (this.props.currentUser) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>

        <LoginForm onSubmit={this.handleSubmit} />

        {this.props.error && (
          <span style={{ color: "red" }}>{this.props.error}</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    currentUser: state.currentUser,
    error: state.login.error
  };
};

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
