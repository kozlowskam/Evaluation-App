import React, { PureComponent } from "react";
import { connect } from "react-redux";

export class BatchEvaluation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getBatchEvaluations() {
    let batch = this.props.batch;
    console.log(batch);

    batch.evaluations.map(s => {
      return s.color;
    });
  }

  // // students.map(s => {
  // //   return s.evaluations;
  // });
  render() {
    const { batch, evaluations } = this.props;
    return (
      <div>
        <table>
          <tr>
            <td>
              <h3>
                Class Evaluations: {this.getBatchEvaluations}
                <br />
              </h3>
            </td>
            <td />
          </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    batch: state.batch
  };
};

export default connect(mapStateToProps)(BatchEvaluation);
