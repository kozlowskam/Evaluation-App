import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { fetchAllBatches } from "../actions/batches";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { addStudent, deleteStudent, getStudent } from "../actions/students";
import { getEvaluation } from "../actions/evaluation";
import StudentForm from "./StudentForm";
import { Redirect } from "react-router-dom";
import BatchEvaluation from "./BatchEvaluation";
import Moment from "react-moment";

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

  // componentWillMount() {
  //   const { batch } = this.props.batch;
  //   //let students = batch.students;
  //   console.log(batch);
  // }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!this.props.batch.id) {
      this.props.fetchBatch(id);
    }
  }

  addStudent = student => {
    const { batch } = this.props;
    //console.log(batch);
    student = { ...student, batch: batch.id };
    //console.log(batch.id);
    this.props.addStudent(student);
  };

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId);
  }

  getStudent(studentId) {
    this.props.getStudent(studentId);
  }

  getGreen() {
    //const { id } = this.props.match.params;
    const { batch } = this.props;
    var green = batch.evaluations.filter((color = "green"));
  }

  render() {
    const { batch, students, users, authenticated, evaluations } = this.props;

    if (!authenticated) return <Redirect to="/login" />;

    return (
      <div>
        <Paper className="styles" elevation={4}>
          {!batch.id && <div>Loading...</div>}

          {batch.id && (
            <table>
              <thead>
                <tr>
                  <th>color</th>
                </tr>
              </thead>
              <tbody>
                {batch.evaluations.map((evaluation, color) => (
                  <tr key={evaluation.color}>
                    <td>{this.getGreen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br />
          {batch.id && (
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Last evaluation</th>
                </tr>
              </thead>
              <tbody>
                {batch.students.map((student, index) => (
                  <tr key={student.index}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>
                      {
                        student.evaluations.map(e => {
                          return e.color;
                        })[student.evaluations.length - 1]
                      }
                    </td>
                    <td>{this.getStudentEvaluation}</td>

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
          <h1>{this.getGreen}</h1>
          <h1>Add new student</h1>
          <StudentForm onSubmit={this.addStudent} />
          <BatchEvaluation />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    student: state.student,
    batch: state.batch,
    students: state.students,
    authenticated: state.currentUser !== null
    // users: state.users === null ? null : state.users
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
