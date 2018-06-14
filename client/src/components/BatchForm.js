import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

class BatchForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      selectedValue: event.target.value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                label="Batch NR"
                name="batchNumber"
                id="batchNumber"
                value={
                  this.state.batchNumber || initialValues.batchNumber || ""
                }
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                label="Start Date"
                name="inDate"
                id="inDate"
                value={this.state.inDate || initialValues.inDate || ""}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                label="End Date"
                name="endDate"
                id="endDate"
                value={this.state.endDate || initialValues.endDate || ""}
                onChange={this.handleChange}
              />
            </div>

            <br />
            <Button type="submit">Save</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default BatchForm;
