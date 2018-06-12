import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { fetchAllBatches } from "../actions/batches";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { addStudent, deleteStudent, getStudent } from "../actions/students";
import StudentForm from "./StudentForm";
import { Redirect } from "react-router-dom";

class StudentList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidUpdate(prevProps) {
  //   const { id } = this.props.match.params;

  //   if (!this.props.batch.students.length != prevProps.batch.students.length) {
  //     this.props.fetchBatch(id);
  //   }
  // }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchBatch(id);
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

  getStudent(studentId) {
    this.props.getStudent(studentId);
  }

  render() {
    const { batch, students, users, authenticated } = this.props;
    // console.log(batch);
    if (!authenticated) return <Redirect to="/login" />;

    return (
      <div>
        <Paper className="styles" elevation={4}>
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
                    <td>
                      {" "}
                      <Link
                        className="link"
                        to={`/students/${student.id}`}
                        onClick={() => this.getStudent(student.id)}
                      >
                        DEATAILS
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h1>Add new student</h1>
          <StudentForm onSubmit={this.addStudent} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    batch: state.batch,
    students: state.students,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  };
};

export default connect(
  mapStateToProps,
  {
    fetchBatch,
    fetchAllBatches,
    addStudent,
    deleteStudent,
    getStudent
  }
)(StudentList);
