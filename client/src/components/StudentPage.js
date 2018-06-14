import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { updateStudent, getStudent } from "../actions/students";
import { addEvaluation, getEvaluation } from "../actions/evaluation";
import StudentForm from "./StudentForm";
import EvaluationForm from "./EvaluationForm";
import Moment from "react-moment";
import Image from "../components/Image";

class StudentPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: this.props.match.params.id };
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;

    if (!this.props.student.id) {
      this.props.getStudent(id);
    }
  }

  componentWillMount() {
    this.props.getStudent(this.props.match.params.id);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!this.props.student.id) {
      this.props.getStudent(id);
    }
  }

  componentReload() {
    this.props.getStudent(this.props.match.params.id);
  }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  updateStudent = student => {
    this.props.updateStudent(this.props.match.params.id, student);
    this.toggleEdit();
  };

  addEvaluation = evaluation => {
    const { student } = this.props;

    evaluation = {
      ...evaluation,
      student: student.id
    };
    this.props.addEvaluation(evaluation);
    this.componentReload();
    console.log(student.id);
  };

  oneBack = event => {
    this.props.history.go(-1);
  };

  getEvaluation(evaluationId) {
    this.props.getEvaluation(evaluationId);
  }

  render() {
    const {
      evaluations,
      student,
      batch,
      users,
      authenticated,
      evaluation
    } = this.props;
    if (!student) return null;
    if (!authenticated) return <Redirect to="/login" />;
    // if (
    //   !this.props.student ||
    //   this.props.student.id !== parseInt(this.props.match.params.id)
    // ) {
    //   this.componentReload();
    //   return <div>...</div>;
    // }

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <Button onClick={this.oneBack}>BACK TO BATCH </Button>
          {this.state.edit && <StudentForm onSubmit={this.updateStudent} />}

          {!this.state.edit && (
            <div>
              <Button onClick={this.toggleEdit}>edit</Button>
              <Image content={student.image} />
              <h1>
                {student.firstName} <span />
                {student.lastName}
              </h1>
            </div>
          )}

          {student.id &&
            student.evaluations && (
              <table>
                <thead>
                  <tr>
                    <th>Evaluation Date</th>
                    <th>Color</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {student.evaluations.map((evaluation, index) => (
                    <tr key={evaluation.index}>
                      <td>
                        {" "}
                        <Moment format="YYYY/MM/DD">
                          {evaluation.date}
                        </Moment>{" "}
                      </td>
                      <td> {evaluation.color}</td>
                      <td>{evaluation.comment}</td>
                      <td>
                        {" "}
                        <Link
                          className="link"
                          to={`/evaluations/${evaluation.id}`}
                          onClick={() => this.getEvaluation(evaluation.id)}
                        >
                          EDIT
                        </Link>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          <EvaluationForm onSubmit={this.addEvaluation} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state, props) {
  return {
    student: state.student,
    evaluations: state.evaluations,
    evaluation: state.evaluation,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  };
};

export default connect(
  mapStateToProps,
  { getStudent, updateStudent, addEvaluation, getEvaluation }
)(StudentPage);
