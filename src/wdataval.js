var mongoose = require("mongoose");

var Val = mongoose.model("link_col", {
  link: { type: String },
  tag: { type: Array }
});

module.exports = { Val };
