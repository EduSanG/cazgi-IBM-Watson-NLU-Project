const express = require('express');
const app = new express();
const dotenv = require('dotenv')
dotenv.config();

function getNLUInstance(){
    const api_key = process.env.API_KEY;
    const api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    })
    return naturalLanguageUnderstanding
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(response => res.send(response.result.emotion.document.emotion))
    .catch(err => res.send("Error, Unable to reach"))
});

app.get("/url/sentiment", (req,res) => {
    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(response => res.send(response.result.sentiment.document.label))
    .catch(err => res.send("Error, Unable to reach"))
});

app.get("/text/emotion", (req,res) => {
    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {}
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(response => res.send(response.result.emotion.document.emotion))
    .catch(err => res.send("Error, Unable to reach"))
});

app.get("/text/sentiment", (req,res) => {
    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(response => res.send(response.result.sentiment.document.label))
    .catch(err => res.send("Error, Unable to reach"))
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

