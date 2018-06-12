import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { updateStudent, getStudent } from "../actions/students";
import { addEvaluation } from "../actions/evaluation";
import { fetchBatch } from "../actions/batch";
import StudentForm from "./StudentForm";
import EvaluationForm from "./EvaluationForm";

class StudentPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   toggleEdit = () => {
  //     this.setState({
  //       edit: !this.state.edit
  //     });
  //   };

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;

    if (!this.props.student.id) {
      this.props.getStudent(id);
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!this.props.student.id) {
      this.props.getStudent(id);
    }
  }

  updateStudent = student => {
    this.props.updateStudent(this.props.match.params.id, student);
    //this.toggleEdit();
  };

  addEvaluation = evaluation => {
    const { student } = this.props;
    console.log(student);
    evaluation = { ...evaluation, student: student.id };
    console.log(student.id);
    this.props.addEvaluation(evaluation);
  };

  fetchBatch() {
    const { student } = this.props;
    console.log(student);
    const batchId = student.batch;
    this.props.fetchBatch(batchId);
    console.log(student.batch);
  }

  render() {
    const { student, evaluations, batch } = this.props;
    if (!student) return null;

    return (
      <div>
        <Link
          className="link"
          to={`/batches/${student.batch}`}
          onClick={() => this.fetchBatch(student.batch)}
        >
          BACK TO BATCH
        </Link>
        {/* {this.state.edit && <StudentForm onSubmit={this.updateStudent} />}
        {!this.state.edit && (
          <div>
            <Button onClick={this.toggleEdit}>edit</Button>
            <h1>
              {student.firstName}
              {student.lastName}
            </h1>
          </div>
        )} */}
        {student.id && (
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
                  <td>{evaluation.date}</td>
                  <td>{evaluation.color}</td>
                  <td>{evaluation.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <EvaluationForm onSubmit={this.addEvaluation} />
      </div>
    );
  }
}

const mapStateToProps = function(state, props) {
  return {
    student: state.student,
    evaluations: state.evaluations
  };
};

export default connect(
  mapStateToProps,
  { getStudent, updateStudent, addEvaluation, fetchBatch }
)(StudentPage);
