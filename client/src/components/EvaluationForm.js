import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

class EvaluationForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      color: "",
      date: "",
      comment: ""
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};

    const gridStyle = {
      display: "flex",
      justifyContent: "center"
    };

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                label="Color"
                name="color"
                id="color"
                value={this.state.color || initialValues.color || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <TextField
                label="Date"
                name="date"
                id="date"
                value={this.state.date || initialValues.date || ""}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                label="Comment"
                name="comment"
                id="comment"
                value={this.state.comment || initialValues.comment || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <Button type="submit">ADD EVALUATION</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default EvaluationForm;
