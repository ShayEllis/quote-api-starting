const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`The server is running: http://localhost:${PORT}`)
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {}
    randomQuote.quote = getRandomElement(quotes)
    res.send(randomQuote)
})
app.get('/api/quotes', (req, res, next) => {
    const query = req.query.person
    const selectedQuotes = {}
    if (query) {
        selectedQuotes.quotes = quotes.filter((quote) => quote.person === query)
    } else {
        selectedQuotes.quotes = quotes
    }
    res.send(selectedQuotes)
})
app.post('/api/quotes', (req, res, next) => {
    const newQuote = {}
    if (req.query.quote && req.query.person) {
        newQuote.quote = req.query
        res.send(newQuote)
    } else {
        res.status(400).send()
    }
})