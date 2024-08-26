const express = require("express");
const app = express();

const gameRoutes = require("./routes/gameRouter");
const categoryRoutes = require("./routes/categoryRouter");
const developerRoutes = require("./routes/developerRouter");
const developerTypeRoutes = require("./routes/developerTypeRouter");
const platformRoutes = require("./routes/platformRouter");
const publisherRoutes = require("./routes/publisherRouter");

app.use("/game", gameRoutes);
app.use("/developer", developerRoutes);
app.use("/developerType", developerTypeRoutes);
app.use("/category", categoryRoutes);
app.use("/platform", platformRoutes);
app.use("/publisher", publisherRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the app");
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
