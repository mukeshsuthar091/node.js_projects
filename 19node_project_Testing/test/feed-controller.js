import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";

import Post from "../models/post.js";
import User from "../models/user.js";
import { createPost } from "../controllers/feed.js";

describe("Feed Controller", function(){
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

  it("should add a created post to the posts of the creator", function (done) {
    const req = {
      body: {
        title: "Test Post",
        content: "A Test Post",
      },
      file: {
        path: "abc",
      },
      userId: "66026b095126a2b3f125fe0b",
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
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
