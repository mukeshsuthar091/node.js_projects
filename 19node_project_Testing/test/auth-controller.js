import { expect } from "chai";
import sinon from "sinon";
import mongoose, { modelNames } from "mongoose";

import { getUserStatus, login } from "../controllers/auth.js";
import User from "../models/user.js";

describe("Auth Controller", function() {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://nova:nova000@cluster0.uqrrthi.mongodb.net/test-messages?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "66026b095126a2b3f125fe0b",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  

  it("should throw an error with code 500 if accessing the database fails", function(done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };

      login(req, {}, () => {})
      .then(result=>{
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    })

    User.findOne.restore();
  });

  it("should send a response with a valid user status for an existing user", function (done) {
    const req = { userId: "66026b095126a2b3f125fe0b" };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };
    getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal("I an new!");
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
