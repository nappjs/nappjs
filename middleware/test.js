console.log("test middleware");

module.exports = (req, res, next) => {
  // res.send("aaa");
  next();
};
