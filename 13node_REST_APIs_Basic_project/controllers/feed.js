const { title } = require("process");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the first post!" }],
  });
};

exports.createPosts = (req, res, next) => {
    let title = req.body.title;
    let content = req.body.content;
    console.log(title, content);
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
