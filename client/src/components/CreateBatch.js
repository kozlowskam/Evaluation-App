import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBatch } from "../actions/batch";
import { addStudent } from "../actions/students";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";
import BatchForm from "./BatchForm";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";

export class CreateBatch extends PureComponent {
  addBatch = batch => {
    this.props.addBatch(batch);
  };

  addStudent = student => {
    const { batch } = this.props;
    console.log(batch);
    student = { ...student, batch: batch.id };
    this.props.addStudent(student);
    console.log(batch.id);
  };

  render() {
    const { batch, student, users, authenticated } = this.props;

    if (!authenticated) return <Redirect to="/login" />;

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <h2> Create Batch </h2>
          <BatchForm onSubmit={this.addBatch} />
          <br />
          <br />
          <h2> Add students </h2>
          <StudentForm onSubmit={this.addStudent} />
          <br />
          <Button type="submit" href="/batches">
            DONE
          </Button>
          <br /> <br />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    batch: state.batch,
    students: state.students,
    batches: state.batches,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  };
};

export default connect(
  mapStateToProps,
  {
    addBatch,
    addStudent
  }
)(CreateBatch);
