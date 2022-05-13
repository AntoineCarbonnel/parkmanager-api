module.exports = app => {
  const parking = require("../controllers/parking.controller.js");
  const router = require("express").Router();
  // Create a new parking
  router.post("/", parking.create);

  router.get("/:user_id", parking.findAllByUserId);

  // Retrieve a single parking with id
  router.get("/:id", parking.findOne);
  // Update a parking with id
  router.put("/:id", parking.update);
  // Delete a parking with id
  router.delete("/:id", parking.delete);
  // Delete all parking
  router.delete("/:user_id", parking.deleteAllByUserId);
  app.use('/api/parking', router);
};
