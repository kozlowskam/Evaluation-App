import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllBatches } from "../actions/batches";
import { fetchBatch, addBatch } from "../actions/batch";
import BatchForm from "./BatchForm";
import Button from "@material-ui/core/Button";

class BatchesList extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        dates: PropTypes.string.isRequired
      })
    ).isRequired
  };

  componentWillMount() {
    this.props.fetchAllBatches();
    console.log(this.props);
  }

  fetchBatch(batchId) {
    this.props.fetchBatch(batchId);
  }

  addBatch = batch => {
    this.props.addBatch(batch);
  };

  render() {
    const { batches, batch } = this.props;
    console.log(this.props);

    const OrderedBatches = batches.sort(function(a, b) {
      return a.id - b.id;
    });

    return (
      <div className="App">
        <h1>All the Batches</h1>
        <table>
          <thead>
            <tr>
              <th>Batch NR</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {OrderedBatches.map(batch => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>{batch.inDate}</td>
                <td>{batch.endDate}</td>
                <td>
                  <Link
                    className="link"
                    to={`/batches/${batch.id}`}
                    onClick={() => this.fetchBatch(batch.id)}
                  >
                    See Students
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <Link className="link" to={`/createbatch`}>
          create batch
        </Link> */}
        <Button href={`/createbatch`} target="_blank">
          Create Batch.
        </Button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    batches: state.batches,
    batch: state.batch
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllBatches,
    fetchBatch,
    addBatch
  }
)(BatchesList);
