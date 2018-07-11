const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const host = "http://localhost:4000";

describe("STUDENTS REST API", () => {
  it('DELETE /students/8 returns "Student Deleted', done => {
    chai
      .request(host)
      .delete("/students/8")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
