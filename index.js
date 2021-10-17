const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const wholeList = []
const currencyList = []

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
                const rate = $(this).find('.1rate').text()
                // const country = $(this).text()
                // currencyList.push(country)
                console.log(country)
                console.log(rate)
                wholeList.push({
                    country,
                    rate
                })
            })
            if(currencyList.length !== 9) {
                for (let i  = 0; i<=8; i++){
                    currencyList.push(wholeList[i])
                }
            }
            res.json(currencyList)
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})

