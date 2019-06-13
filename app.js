var bodyParser = require('body-parser')
const express  = require("express");
var http = require("http");
const app = express();
var cors = require('cors');
var rp = require('request-promise');

const {findEmail, isAcceptAllDomain} = require("./checkk-mx-email-patterns")

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());

app.post('/api/google/', async function (req, res) {
    console.log(req.body.token)
    var options = {
        method: 'POST',
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            secret: '6LdDgqgUAAAAAGux-4epYBGe26HTxKgAEcaY5E3Q',
            response: req.body.token
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        json: true // Automatically stringifies the body to JSON
    };
    
    rp(options)
        .then(function (parsedBody) {
            // POST succeeded...
            console.log(parsedBody)
            return res.send(parsedBody)
        })
        .catch(function (err) {
            // POST failed...
            console.log(err)
            return res.status(500).send({err: "err"})
        });
    


})

app.post('/api/checkemail/', async function (req, res) {
    const {firstName, lastName, domain } = req.body
    if (firstName && lastName && domain){ 
        console.log(req.body)
        const isAcceptAll = await isAcceptAllDomain(domain)
        if(isAcceptAll){
            return res.json({"canSendEmails": [
                {
                    "wellFormed": true,
                    "validDomain": true,
                    "validMailbox": true,
                    "email": "Accept All Domain: " + `${firstName}@${domain}`
                }]})
        }
        const result =  await findEmail(firstName, lastName, domain)
        return res.json(result)
    } else {
        return res.json({error: "firstName, lastName, domain  are missing "})
    }
})

var server = http.createServer(app);
server.listen(3333, function() {
    console.log("Express server listening on port 3333");
});