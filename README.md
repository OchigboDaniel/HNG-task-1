Number Classifier API
This is  a simple Node.js API that provides facts about a given number inserted in the query. It determine whether the number is prime, perfect and also calculates its digit sum. Additionally, it fetches a fun fact about the number using the numbers API -- http://numbersapi.com.

Features
Prime Check 
Perfect Number check.
Digit sum calculation.
Fetches a fun fact related to the number from an external API.

Installation
Clone the repository:
bash
Copy
git clone https://github.com/OchigboDaniel/HNG-task-1.git
cd number-classifier-api
Install dependencies:
bash
Copy
npm install

Start the server:
bash
Copy
npm run serever
This will start the Express server on http://localhost:3000.

API Usage
Endpoint: /api/classify-number
Method: GET
Query Parameter:
number: The number you want to classify (integer).
Example Request:
bash
Copy
GET http://localhost:3000/classify-number?number=28
Example Response (for number=28):
json
Copy
{
  "number": 28,
  "is_prime": false,
  "is_perfect": true,
  "properties": ["even"],
  "digit_sum": 10,
  "fun_fact": "28 is the only number that is the sum of two nonzero squares in two different ways."
}
Error Responses
Invalid Number: If the number query parameter is not a valid number:
json
Copy
{
  "number": "Notan integer",
  "error": "true"
}
Server Error: If there is an error while fetching the fun fact:
json
Copy
{
  "status": "fail",
  "message": "Unable to connect to numbersapi"
}
Technologies used
node.js
express.js
