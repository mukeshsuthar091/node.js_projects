import { expect } from "chai";
import jwt from "jsonwebtoken";
import Sinon from "sinon";

import isAuth from "../middleware/is-auth.js";

describe("Auth middleware", function () {
  it("should throw an error if no authorization header is present", function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not authenticated!");
  });

  it("should throw an error if the authorization header is only one string", function () {
    const req = {
      get: function (headerName) {
        return "xyz";
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyzshelnleskgnelfkn";
      },
    };
    Sinon.stub(jwt, 'verify');
    jwt.verify.returns({userId: 'abc'});
    isAuth(req, {}, () => {});
    expect(req.userId).to.equal("abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("should throw an error if the token cannot be verified", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw();
  });

});
