import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBatch } from "../actions/batch";
import { addStudent } from "../actions/students";
import { Link } from "react-router-dom";
import StudentForm from "./StudentForm";
import BatchForm from "./BatchForm";
import Button from "@material-ui/core/Button";

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
    const { batch, student } = this.props;
    console.log(this.props);

    return (
      <div>
        <h2> Create Batch </h2>
        <BatchForm onSubmit={this.addBatch} />
        <br />
        <StudentForm onSubmit={this.addStudent} />
        <br />
        <Button type="submit" href="/batches">
          DONE
        </Button>
        <br /> <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    batch: state.batch,
    students: state.students,
    batches: state.batches
  };
};

export default connect(
  mapStateToProps,
  {
    addBatch,
    addStudent
  }
)(CreateBatch);
