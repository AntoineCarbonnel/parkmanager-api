const Place = require("../models/place.model.js")

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const place = new Place({
    name: req.body.name,
    address: req.body.address,
    user_id: req.body.user_id
  })

  Place.create(place, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the place."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Place.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found place with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving place with id " + req.params.id
        })
      }
    } else res.send(data)
  })
}

exports.findAllByUserId = (req, res) => {
  Place.getAllByUserId(req.params.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || `No found places owned by id ${req.params.id}.`
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
  Place.updateById(
          req.params.id,
          new place(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found place with id ${req.params.id}.`
                })
              } else {
                res.status(500).send({
                  message: "Error updating place with id " + req.params.id
                })
              }
            } else res.send(data)
          }
  )
}

exports.delete = (req, res) => {
  Place.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found place with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete place with id " + req.params.id
        })
      }
    } else res.send({message: `place was deleted successfully!`})
  })
}

exports.deleteAllByUserId = (req, res) => {
  Place.removeAllByUserId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
                err.message || "Some error occurred while removing all place's."
      })
    else res.send({message: `All place's were deleted successfully!`})
  })
}
