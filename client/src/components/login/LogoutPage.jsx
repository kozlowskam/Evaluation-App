import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/users";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

class LogoutPage extends PureComponent {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    if (!this.props.currentUser) return <Redirect to="/" />;

    return (
      <div>
        <Paper className="logIn">
          <h1>Logging out...</h1>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null
});

export default connect(
  mapStateToProps,
  { logout }
)(LogoutPage);
