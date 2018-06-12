import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import BatchList from "./components/BatchList";
import StudentList from "./components/StudentList";
import CreateBatch from "./components/CreateBatch";
import StudentPage from "./components/StudentPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/batches" component={BatchList} />
          <Route exact path="/batches/:id" component={StudentList} />
          <Route exact path="/createbatch" component={CreateBatch} />
          <Route exact path="/students/:id" component={StudentPage} />
        </div>
      </Router>
    );
  }
}

export default App;
