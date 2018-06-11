import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { fetchAllBatches } from "../actions/batches";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { addStudent } from "../actions/students";
import StudentForm from "./StudentForm";

class StudentList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.fetchBatch();
    console.log(this.props);
  }
  //   componentDidMount() {
  //     const { id } = this.props.match.params;

  //     if (!this.props.batch) {
  //       this.props.fetchBatch(id);
  //     }
  //   }

  addStudent = student => {
    let batch = this.props;
    console.log(batch);
    student = { ...student, batch: batch.id };
    this.props.addStudent(student);
  };

  render() {
    const { batch } = this.props;
    // console.log(batch);

    return (
      <div>
        {!this.props.batch && <div>Loading...</div>}
        {this.props.batch(
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>First name</th>
                <th>Last name</th>
              </tr>
            </thead>
            <tbody>
              {batch.students.map((student, index) => (
                <tr key={student.index}>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h1>Add new student</h1>
        <StudentForm onSubmit={this.addStudent} />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    batch: state.batch,
    batches: state.batches
  };
};

export default connect(
  mapStateToProps,
  {
    fetchBatch,
    fetchAllBatches,
    addStudent
  }
)(StudentList);
