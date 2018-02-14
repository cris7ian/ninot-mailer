const {json} = require('micro')
const post = require('axios').post
// require 'rest-client'
//
// API_KEY = ENV['MAILGUN_API_KEY']
// API_URL = "https://api:#{API_KEY}@api.mailgun.net/v2/<your-mailgun-domain>"
//
// RestClient.post API_URL+"/messages",
//     :from => "ev@example.com",
//     :to => "ev@mailgun.net",
//     :subject => "This is subject",
//     :text => "Text body",
//     :html => "<b>HTML</b> version of the body!"

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  json(req)
    .then(js => post(`https://api:${process.env.MAILGUN_API_KEY}@api.mailgun.net/v2/${process.env.MAILGUN_DOMAIN}`,
        {
          from: 'info@ninotcuina.com',
          to: 'cristiancaroli@gmail.com',
          subject: 'info',
          text: `
          ${js.name} <${js.email}>

          ${js.body}
          `
        }
      ).then(result => res.end(JSON.stringify(result)))
    })
    .catch(error => res.end("error"))
}
