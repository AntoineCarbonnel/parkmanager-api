module.exports = app => {
  const parking = require("../controllers/parking.controller.js");
  const router = require("express").Router();

  router.post("/", parking.create);

  router.get("/user/:user_id", parking.findAllByUserId);

  router.get("/", parking.findAll);

  router.get("/:id", parking.findOne);

  router.put("/:id", parking.update);

  router.delete("/:id", parking.delete);

  router.delete("/user/:user_id", parking.deleteAllByUserId);
  app.use('/api/parking', router);
};
