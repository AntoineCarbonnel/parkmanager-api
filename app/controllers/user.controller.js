const User = require("../models/user.model.js")

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const tutorial = new User({
    name: req.body.name,
    address: req.body.address,
    user_id: req.body.user_id
  })

  User.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        })
      }
    } else res.send(data)
  })
}

exports.findAll = (req, res) => {
  User.getAll(req.params.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || `No found Users owned by id ${req.params.id}.`
      })
    else res.send(data)
  })
}

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  console.log(req.body)
  User.updateById(
          req.params.id,
          new User(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found User with id ${req.params.id}.`
                })
              } else {
                res.status(500).send({
                  message: "Error updating User with id " + req.params.id
                })
              }
            } else res.send(data)
          }
  )
}

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        })
      }
    } else res.send({message: `User was deleted successfully!`})
  })
}

exports.deleteAll = (req, res) => {
  User.removeAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
                err.message || "Some error occurred while removing all User's."
      })
    else res.send({message: `All User's were deleted successfully!`})
  })
}