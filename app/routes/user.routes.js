module.exports = app => {
  const user = require("../controllers/user.controller.js"),
          router = require("express").Router(),
          auth = require('../middleware/auth')

  router.post("/login", user.login);

  router.post("/register", user.create);

  router.put("/:id", user.update)

  router.get("/:id", user.findOne);

  router.delete("/:id", user.delete)

  app.use('/api/user', router);
};
