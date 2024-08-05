const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const shortid = require('shortid');
// const urlRouter = require("./routes/urlroute");
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongoDB is connected")
);

app.use(express.json());

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const entry = await URL.findOneAndUpdate({shortId} ,
    {
      $push: {
        visiteHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  // console.log(entry);
  res.redirect(entry.redirectURL);
});

app.post("/url", async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(404).json({ error: "url is required" });
  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visiteHistory: [],
  });
 
  return res.json({ id: shortID });
});

app.get("/analytics/:shortId", async (req, res) => {
  const {shortId} = req.params;
  const result = await URL.findOne({ shortId });
  // console.log(result);
  res.json({
    totalClicks: result.visiteHistory.timeStamp,
    analytics: result.visiteHistory.length,
  });
});

app.listen(port, () => {
  console.log(`port is listening on ${port}`);
});
