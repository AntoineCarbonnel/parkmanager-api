const Parking = require("../models/parking.model.js")

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const parking = new Parking({
    name: req.body.name,
    address: req.body.address,
    user_id: req.body.user_id
  })

  Parking.create(parking, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Parking."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Parking.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Parking with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Parking with id " + req.params.id
        })
      }
    } else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Parking.findAll( (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || `No found Parkings`
      })
    else res.send(data)
  })
}

exports.findAllByUserId = (req, res) => {
  Parking.getAllByUserId(req.params.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || `No found Parkings owned by id ${req.params.id}.`
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
  Parking.updateById(
          req.params.id,
          new Parking(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Parking with id ${req.params.id}.`
                })
              } else {
                res.status(500).send({
                  message: "Error updating Parking with id " + req.params.id
                })
              }
            } else res.send(data)
          }
  )
}

exports.delete = (req, res) => {
  Parking.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Parking with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Parking with id " + req.params.id
        })
      }
    } else res.send({message: `Parking was deleted successfully!`})
  })
}

exports.deleteAllByUserId = (req, res) => {
  Parking.removeAllByUserId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
                err.message || "Some error occurred while removing all parking's."
      })
    else res.send({message: `All Parking's were deleted successfully!`})
  })
}
