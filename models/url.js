const mongoose = require("mongoose");

// Schema Define

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: "string",
      required: true,
      unique: true,
    },
    redirectURL: {
      type: "string",
      required: true,
    },
    visiteHistory: [
      {
        timeStamp: { type: "number" },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model('url' , urlSchema);

module.exports = URL;