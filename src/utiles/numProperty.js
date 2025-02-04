const axios = require("axios")

module.exports = {
    
    is_prime: function(num){
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++){
            if (num % i === 0) return false;
        }
        return true
    },



is_perfect: function(num){
        //Check if number is a perfect number
        let sum = 0;
        for (let i =1; i <= num / 2; i++){
            if (num % i === 0) sum += i;
        }
        if (sum === num) return true;
        return false
},

digit_sum: function(num){
    const digits = num.toString().split('');
    let sum = 0;
    for ( let i = 0; i < digits.length; i++){
        sum += Number(digits[i])
    }
    return sum
},

// Check if the num is an armstrung number
properties: function(num){
    let oddEven;
    let armstrong;
    
    // If the num is odd let the initiallize oddEven = odd, vice versa
    oddEven = num % 2 === 0 ? "even" : "odd";
    
    const digits = num.toString().split('');
    const power = digits.length;
    const sum = digits.reduce((acc, digit)=> acc + Math.pow(Number(digit), power), 0)
    
    armstrong = sum === num ? true : false

    if (armstrong === true){
        return ["armstrong", `${oddEven}`]
    }
    return [`${oddEven}`]
},

// this funtion returns thre fun facts 
fun_fact: async function(url, num){
    const response = await axios.get(`${url}/${num}/math?json`);
    const funFact = response.data.text

    return funFact
}
}