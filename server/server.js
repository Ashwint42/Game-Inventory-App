const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const gameRoutes = require("./routes/gameRouter");
const categoryRoutes = require("./routes/categoryRouter");
const developerRoutes = require("./routes/developerRouter");
const developerTypeRoutes = require("./routes/developerTypeRouter");
const platformRoutes = require("./routes/platformRouter");
const publisherRoutes = require("./routes/publisherRouter");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/games", gameRoutes);
app.use("/developer", developerRoutes);
app.use("/developerType", developerTypeRoutes);
app.use("/category", categoryRoutes);
app.use("/platform", platformRoutes);
app.use("/publisher", publisherRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the app");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
