const sql = require("./db.js")

const place = function (place) {
  this.name = place.name
  this.address = place.address
  this.user_id = place.user_id
}

place.create = (newPlace, result) => {
  const date = new Date()

  newPlace.created_at = date
  newPlace.updated_at = date

  sql.query("INSERT INTO place SET ?", newPlace, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    console.log("created place: ", {id: res.insertId, ...newPlace})
    result(null, {id: res.insertId, ...newPlace})
  })
}

place.findById = (id, result) => {
  sql.query(`SELECT *
             FROM place
             WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log("found place: ", res[0])
      result(null, res[0])
      return
    }
    // not found place with the id
    result({kind: "not_found"}, null)
  })
}

place.getAllByUserId = (user_id, result) => {
  sql.query("SELECT * FROM place WHERE user_id= ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("place: ", res)
    result(null, res)
  })
}

place.updateById = (id, place, result) => {
  sql.query(
          "UPDATE place SET name = ?, address = ?, user_id = ? WHERE id = ?",
          [place.title, place.description, place.user_id, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err)
              result(null, err)
              return
            }
            if (res.affectedRows === 0) {
              // not found place with the id
              result({kind: "not_found"}, null)
              return
            }
            console.log("updated place: ", {id: id, ...place})
            result(null, {id: id, ...place})
          }
  )
}

place.remove = (id, result) => {
  sql.query("DELETE FROM place WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    if (res.affectedRows === 0) {
      // not found place with the id
      result({kind: "not_found"}, null)
      return
    }
    console.log("deleted place with id: ", id)
    result(null, res)
  })
}

place.removeAllByUserId = (user_id, result) => {
  sql.query("DELETE FROM place WHERE user_id = ?", place.user_id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log(`deleted ${res.affectedRows} place`)
    result(null, res)
  })
}

module.exports = place
