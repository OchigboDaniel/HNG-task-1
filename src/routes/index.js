const express = require("express")
const numberChecker = require("../utiles/numProperty")
const asynchandler = require("../utiles/asyncErrorHandler")

const router = express.Router()

router.use("/classify-number", asynchandler(async (req, res)=>{
    // Get the number and convert it to Integer
    const queryValue = Number(req.query.number)

    // Check if number is an integer
    if (!/^-?\d+$/.test(queryValue)){
        res.status(400).json({
            "number": "Not an Integer",
            "error": "true"
        } )    
    }

    const url = "http://numbersapi.com"

    const funFact = await numberChecker.fun_fact(url, queryValue)

    res.status(200).json({
        "number": queryValue,
        "is_prime": numberChecker.is_prime(queryValue),
        "is_perfect": numberChecker.is_perfect(queryValue),
        "properties": numberChecker.properties(queryValue),
        "digit_sum": numberChecker.digit_sum(queryValue),
        "fun_fact": funFact
    })

}))

module.exports = router



