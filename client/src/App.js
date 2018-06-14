import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import BatchList from "./components/BatchList";
import StudentList from "./components/StudentList";
import CreateBatch from "./components/CreateBatch";
import StudentPage from "./components/StudentPage";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import LogoutPage from "./components/login/LogoutPage";
import EditEvaluation from "./components/editEvaluation";
import AppBar from "./components/AppBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar />
          <Route exact path="/batches" component={BatchList} />
          <Route exact path="/batches/:id" component={StudentList} />
          <Route exact path="/createbatch" component={CreateBatch} />
          <Route exact path="/students/:id" component={StudentPage} />
          <Route exact path="/evaluations/:id" component={EditEvaluation} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/" render={() => <Redirect to="/batches" />} />
        </div>
      </Router>
    );
  }
}

export default App;
