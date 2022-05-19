const sql = require("./db.js")
// constructor
const User = function (User) {
  this.firstname = User.firstname
  this.lastname = User.lastname
  this.email = User.email
  this.password = User.password
}

User.findByEmail = (user, result) => {
  sql.query(`SELECT *
             FROM User
             WHERE email = '${user.email}'`,
          (err, res) => {
            if (err) {
              console.log("error: ", err)
              result(err, null)
              return
            }
            if (res.length) {
              console.log("Email not found", res[0])
              result(null, res[0])
              return
            }
            result({kind: "not_found"}, null)
          })
}

User.create = (newUser, result) => {
  const date = new Date()

  newUser.created_at = date
  newUser.updated_at = date

  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    console.log("created User: ", {id: res.insertId, ...newUser})
    result(null, {id: res.insertId, ...newUser})
  })
}
User.findById = (id, result) => {
  sql.query(`SELECT *
             FROM User
             WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log("found User: ", res[0])
      result(null, res[0])
      return
    }
    // not found User with the id
    result({kind: "not_found"}, null)
  })
}
User.getAll = (title, result) => {
  let query = "SELECT * FROM User"
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("User: ", res)
    result(null, res)
  })
}
User.updateById = (id, User, result) => {
  sql.query(
          "UPDATE User SET firstname = ?, lastname = ?, email = ? WHERE id = ?",
          [User.firstname, User.lastname, User.email, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err)
              result(null, err)
              return
            }
            if (res.affectedRows == 0) {
              // not found User with the id
              result({kind: "not_found"}, null)
              return
            }
            console.log("updated User: ", {id: id, ...User})
            result(null, {id: id, ...User})
          }
  )
}
User.remove = (id, result) => {
  sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    if (res.affectedRows == 0) {
      // not found User with the id
      result({kind: "not_found"}, null)
      return
    }
    console.log("deleted User with id: ", id)
    result(null, res)
  })
}
User.removeAll = result => {
  sql.query("DELETE FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log(`deleted ${res.affectedRows} User`)
    result(null, res)
  })
}
module.exports = User
