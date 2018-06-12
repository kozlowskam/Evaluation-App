import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { fetchAllBatches } from "../actions/batches";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { addStudent, deleteStudent } from "../actions/students";
import StudentForm from "./StudentForm";

class StudentList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;

    if (!this.props.batch !== prevProps.batch) {
      this.props.fetchBatch(id);
    }

    console.log(this.props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!this.props.batch.id) {
      this.props.fetchBatch(id);
    }
  }

  addStudent = student => {
    const { batch } = this.props;
    console.log(batch);
    student = { ...student, batch: batch.id };
    console.log(batch.id);
    this.props.addStudent(student);
  };

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId);
  }

  render() {
    const { batch, students } = this.props;
    // console.log(batch);

    return (
      <div>
        <Button type="submit" href="/batches">
          HOME
        </Button>
        {!batch.id && <div>Loading...</div>}
        {batch.id && (
          <table>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
              </tr>
            </thead>
            <tbody>
              {batch.students.map((student, index) => (
                <tr key={student.index}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>
                    {" "}
                    <Button
                      className="deleteButton"
                      onClick={() => this.deleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
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
    students: state.students
  };
};

export default connect(
  mapStateToProps,
  {
    fetchBatch,
    fetchAllBatches,
    addStudent,
    deleteStudent
  }
)(StudentList);
