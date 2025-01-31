const express = require("express");

const router = express.Router();
const crudFunctions = require("../../controller/crudController");

//Route to retrive a list of all books with the following details;
// Tittle, Author, Genre, Publication date
router.get("/books", crudFunctions.getBookList);

//This route get details of a specific book usind the id
router.get("/books/:id", crudFunctions.getBookById);

// This routes adds a new book to the library collection using the following detail;
// Id, Tittle, Author, Genre, Publication date, avaliability status
router.post("/books", crudFunctions.addBook);

// This route updates details of an existing book including avaliability status
router.put("/books/:id", crudFunctions.updateBookDetails);

// This route removes a book from the library system using the id
router.delete("/books/:id", crudFunctions.deleteBook);

module.exports = router;
