import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../actions/batch";
import { fetchAllBatches } from "../actions/batches";
import Paper from "@material-ui/core/Paper";
import Image from "../components/Image";
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
    this.state = { id: this.props.match.params.id };
  }

  componentWillMount() {
    this.props.fetchBatch(this.props.match.params.id);
  }

  componentReload() {
    this.props.fetchBatch(this.props.match.params.id);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addStudent = student => {
    const { activeBatch } = this.props;
    //console.log(batch);
    student = { ...student, batch: activeBatch.id };
    //console.log(batch.id);
    this.props.addStudent(student);
  };

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId);
  }

  getStudent(studentId) {
    this.props.getStudent(studentId);
  }

  askQuestion() {
    let randomNumber = Math.floor(Math.random() * 100 + 1);
  }

  render() {
    const { students, users, authenticated } = this.props;

    if (
      !this.props.activeBatch ||
      this.props.activeBatch.id !== parseInt(this.props.match.params.id)
    ) {
      this.componentReload();
      return <div>...</div>;
    }
    //if (!authenticated) return <Redirect to="/login" />;

    const batch = this.props.activeBatch;
    const studentsGroup = batch.students;
    console.log(studentsGroup);

    const BatchEvaluations = studentsGroup.map(st => {
      return {
        evaluation: st.evaluations.sort((a, b) => {
          return a.id - b.id;
        })[st.evaluations.length - 1]
      };
    });

    console.log(BatchEvaluations);

    const GreenEvaluations = BatchEvaluations.filter(
      ev => ev.evaluation.color === "green"
    );

    const YellowEvaluations = BatchEvaluations.filter(
      ev => ev.evaluation.color === "yellow"
    );

    const RedEvaluations = BatchEvaluations.filter(
      ev => ev.evaluation.color === "red"
    );

    const GreenAmount = (
      (GreenEvaluations.length / BatchEvaluations.length) *
      100
    ).toFixed(0);

    const YellowAmount = (
      (YellowEvaluations.length / BatchEvaluations.length) *
      100
    ).toFixed(0);

    const RedAmount = (
      (RedEvaluations.length / BatchEvaluations.length) *
      100
    ).toFixed(0);

    return (
      <div>
        <Paper className="styles" elevation={4}>
          {!batch.id && <div>Loading...</div>}

          <br />
          {batch.id &&
            batch.students && (
              <table>
                <thead>
                  <tr>
                    <th> </th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Last evaluation</th>
                  </tr>
                </thead>
                <tbody>
                  {batch.students.map((student, index) => (
                    <tr key={student.index}>
                      <td>
                        <Image content={student.image} />
                      </td>
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
          {/* //{!GreenAmount == NAN && !YellowAmount == NAN && RedAmount == NAN ( */}
          <p> Green Evaluation {GreenAmount} %</p>
          <p> Yellow Evaluation {YellowAmount} %</p>
          <p> Red Evaluation {RedAmount} %</p>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ activeBatch }) => {
  return { activeBatch };
};

export default connect(
  mapStateToProps,
  {
    fetchBatch,
    addStudent,
    deleteStudent,
    getStudent
  }
)(StudentList);
