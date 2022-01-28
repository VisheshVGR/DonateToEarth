const express = require('express')
const path = require('path')
const Razorpay = require('razorpay')
const shortid = require("shortid")
const cors = require("cors")
const dotenv = require('dotenv')
const bodyParser = require('body-parser');


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
dotenv.config()

const PORT = process.env.PORT || 8000

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
})

// Showing build file
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./frontend/build"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build'))
    })
}

app.get('/logo.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'logo.png'))
})

app.post('/razorpay', async (req, res) => {

    const payment_capture = 1
    const amount = req.body.amount
    const currency = "INR"

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        // console.log(response)

        res.json({
            key: process.env.KEY_ID,
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        })

    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => {
    console.log(`Listening on Port : ${PORT}`)
})