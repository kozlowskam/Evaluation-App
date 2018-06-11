import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

class StudentForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      first_name: "",
      last_name: "",
      image: ""
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
                label="First name"
                name="first_name"
                id="first_name"
                value={this.state.first_name || initialValues.first_name || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <TextField
                label="Last name"
                name="last_name"
                id="last_name"
                value={this.state.last_name || initialValues.last_name || ""}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <TextField
                label="Image"
                name="image"
                id="image"
                value={this.state.image || initialValues.image || ""}
                onChange={this.handleChange}
              />
            </div>

            <Button type="submit">ADD STUDENT</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default StudentForm;
