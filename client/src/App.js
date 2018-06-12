import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import BatchList from "./components/BatchList";
import StudentList from "./components/StudentList";
import CreateBatch from "./components/CreateBatch";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/batches" component={BatchList} />
          <Route exact path="/batches/:id" component={StudentList} />
          <Route exact path="/createbatch" component={CreateBatch} />
        </div>
      </Router>
    );
  }
}

export default App;
