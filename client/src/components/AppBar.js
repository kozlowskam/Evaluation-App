import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { userId } from "../jwt";
import { withRouter } from "react-router";

const styles = {
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

const TopBar = props => {
  const { location, history, user } = props;

  return (
    <AppBar position="static" color="primary" align="center">
      <Toolbar>
        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
          Evaluation App
        </Typography>
        <Button color="inherit" href="/batches">
          HOME
        </Button>
        {location.pathname.indexOf("signup") > 0 && (
          <Button color="inherit" onClick={() => history.push("/login")}>
            Login
          </Button>
        )}
        {location.pathname.indexOf("login") > 0 && (
          <Button color="inherit" onClick={() => history.push("/signup")}>
            Sign up
          </Button>
        )}
        {location.pathname.indexOf("batches/") > 0 && (
          <Button color="inherit" onClick={() => history.push("/batches")}>
            All Batches
          </Button>
        )}
        {/batches$/.test(location.pathname) && (
          <Button color="inherit" onClick={() => history.push("/logout")}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
});

export default withRouter(connect(mapStateToProps)(TopBar));
