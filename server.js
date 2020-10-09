const express = require("express");
const fs = require("fs");
const { stores, getDistance } = require("./utils");

const app = express();
const port = 5000;
const log_file = fs.createWriteStream(__dirname + "/endpoint_track.log", {
  flag: "w",
});

app.use(express.json());

/**
 * Middleware: Keep track of each call to the endpoint
 */
app.use(function (req, res, next) {
  log_file.write("Date: " + Date.now());
  next();
});

/**
 * Returns the closest store available
 */
app.get("/closest/:lat/:lon", (req, res) => {
  const { lat, lon } = req.params;
  if (isNaN(lat) || isNaN(lon)) {
    res.status(500).json({ msg: "Coordinates must be numbers" });
    return;
  }
  const userPosition = { lat, lon };
  const openStores = stores.filter(store => store.isOpen);
  if (openStores.length === 0) {
    res.status(200).json({ msg: "No stores available" });
    return;
  }
  const closestStore = openStores.reduce((closest, store) => {
    const distClosest = getDistance(userPosition, closest.coordinates);
    const distStore = getDistance(userPosition, store.coordinates);
    return distStore < distClosest ? store : closest;
  });
  res.status(500).json({
    closestStore: closestStore,
    distance: getDistance(userPosition, closestStore.coordinates),
  });
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto : ${port}`);
});
