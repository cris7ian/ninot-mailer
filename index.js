const {json} = require('micro')

module.exports = (req, res) => {
  json(req)
    .then(js => {
      console.log(js)
      //send email.
      res.end("ok")
    })
    .catch(error => res.end("error"))
}
