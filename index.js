const {json} = require('micro')
const post = require('axios').post

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const sendMail = (data) => new Promise((resolve, reject) => {
  mailgun.messages().send(data, function (error, body) {
    if (error) return reject(error)
    return resolve(body)
  });
})


module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  json(req)
    .then(js => sendMail(
        {
          from: 'Info <info@ninotcuina.com>',
          to: 'Cris <cristiancaroli@gmail.com>',
          subject: 'info',
          text: `
          ${js.name} ${js.email}

          ${js.body}
          `,
          html: `
          From: ${js.name}, ${js.email}
          <br>
          <br>
          ${js.body}
          `
        })
      ).then(result => {
        console.log(result)
        return res.end(JSON.stringify(result))
      })
      .catch(error => {
        console.log(error)
        return res.end(error.toString())
      })
}
