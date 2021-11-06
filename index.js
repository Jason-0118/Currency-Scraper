const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const app = express()
app.use(
    cors({
        origin: "*",
    })
)
const wholeList = []
const currencyList = []
const individualCurrency = []

app.get('/', (req, res) => {
    res.json('Welcome to my currency rate API')
})

app.get('/currency', (req, res) => {
    axios.get('https://fx-rate.net/USD/')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            $('.tablesorter tbody tr', html).each(function () {
                const country = $(this).find('td').first().text().trim()
                const url_img = "https://fx-rate.net/" + $(this).find('td > img').attr('src')
                const rate = $(this).find('.1rate').text()
                wholeList.push({
                    country,
                    rate,
                    url_img
                })
            })
            if (currencyList.length !== 9) {
                for (let i = 0; i <= 8; i++) {
                    currencyList.push(wholeList[i])
                }
            }
            res.json(currencyList)
        }).catch((err) => console.log(err))
})

app.get('/currency/:name', (req, res) => {
    axios.get('https://fx-rate.net/USD/')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            $('.tablesorter tbody tr', html).each(function () {
                const country = $(this).find('td').first().text().trim()
                const url_img = "https://fx-rate.net/" + $(this).find('td > img').attr('src')
                const rate = $(this).find('.1rate').text()
                wholeList.push({
                    country,
                    rate,
                    url_img
                })
            })
            if (currencyList.length !== 9) {
                for (let i = 0; i <= 8; i++) {
                    currencyList.push(wholeList[i])
                }
            }
            var input = req.params.name.toUpperCase()
            if (input == 'GBP')
                res.json(currencyList[0])
            else if (input == 'EUR')
                res.json(currencyList[1])
            else if (input == 'CHF')
                res.json(currencyList[2])
            else if (input == 'CAD')
                res.json(currencyList[3])
            else if (input == 'AUD')
                res.json(currencyList[4])
            else if (input == 'CNY')
                res.json(currencyList[5])
            else if (input == 'RUB')
                res.json(currencyList[6])
            else if (input == 'INR')
                res.json(currencyList[7])
            else if (input == 'JPY')
                res.json(currencyList[8])
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

//https://cs361-currency-scraper.herokuapp.com/