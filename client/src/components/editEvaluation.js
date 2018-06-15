import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { updateStudent, getStudent } from "../actions/students";
import {
  addEvaluation,
  updateEvaluation,
  getEvaluation
} from "../actions/evaluation";
import EvaluationForm from "./EvaluationForm";
import Moment from "react-moment";

class EditEvaluation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: this.props.match.params.id };
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  //   componentWillMount() {
  //     this.props.getEvaluation(this.props.match.params.id);
  //   }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!this.props.evaluation.id) {
      this.props.getEvaluation(id);
    }
  }

  updateEvaluation = evaluation => {
    this.props.updateEvaluation(this.props.match.params.id, evaluation);
    this.toggleEdit();
  };

  oneBack = event => {
    this.props.history.go(-1);
  };
  render() {
    const { evaluation, student, users, authenticated, history } = this.props;
    if (!evaluation) return null;
    if (!authenticated) return <Redirect to="/login" />;

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <Button onClick={this.oneBack}>BACK TO STUDENT </Button>
          {this.state.edit && (
            <EvaluationForm onSubmit={this.updateEvaluation} />
          )}

          {!this.state.edit && (
            <div>
              <Button onClick={this.toggleEdit}>edit</Button>

              <h2>
                Evaluation color <br />
                {evaluation.color} <br /> <br />
                Comment <br />
                {evaluation.comment}
              </h2>
            </div>
          )}
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = function(state, props) {
  return {
    evaluation: state.evaluation,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  };
};

export default connect(
  mapStateToProps,
  { updateEvaluation, getEvaluation }
)(EditEvaluation);
