const sql = require("./db.js")

const parking = function (parking) {
  this.name = parking.name
  this.address = parking.address
  this.user_id = parking.user_id
}

parking.create = (newParking, result) => {
  sql.query("INSERT INTO parking SET ?", newParking, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    console.log("created parking: ", {id: res.insertId, ...newParking})
    result(null, {id: res.insertId, ...newParking})
  })
}

parking.findById = (id, result) => {
  sql.query(`SELECT *
             FROM parking
             WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log("found parking: ", res[0])
      result(null, res[0])
      return
    }
    // not found parking with the id
    result({kind: "not_found"}, null)
  })
}

parking.getAllByUserId = (user_id, result) => {
  sql.query("SELECT * FROM parking WHERE user_id= ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("parking: ", res)
    result(null, res)
  })
}

parking.updateById = (id, parking, result) => {
  sql.query(
          "UPDATE parking SET name = ?, address = ?, user_id = ? WHERE id = ?",
          [parking.title, parking.description, parking.user_id, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err)
              result(null, err)
              return
            }
            if (res.affectedRows === 0) {
              // not found parking with the id
              result({kind: "not_found"}, null)
              return
            }
            console.log("updated parking: ", {id: id, ...parking})
            result(null, {id: id, ...parking})
          }
  )
}

parking.remove = (id, result) => {
  sql.query("DELETE FROM parking WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    if (res.affectedRows === 0) {
      // not found parking with the id
      result({kind: "not_found"}, null)
      return
    }
    console.log("deleted parking with id: ", id)
    result(null, res)
  })
}

parking.removeAllByUserId = (user_id, result) => {
  sql.query("DELETE FROM parking WHERE user_id = ?", parking.user_id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log(`deleted ${res.affectedRows} parking`)
    result(null, res)
  })
}

module.exports = parking
