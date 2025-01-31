const CustomeError = require("../utiles/customeError");

const db = require("../database/db.js");

const crudFunctions = {
  getBookList: (req, res, next) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
      if (err) {
        const error = new CustomeError(err.message, 500);
        next(error);
        return;
      }

      if (!rows || rows.length === 0) {
        const err = new CustomeError("No record found");
        next(err);
        return;
      }

      res.status(200).json({
        book: rows,
        status: "success",
        message: "Book details recieve successfully.",
      });
    });
  },

  addBook: (req, res, next) => {
    const { title, author, genre } = req.body;

    if (!title || !author || !genre) {
      const err = new CustomeError(
        "{Please provide all required fields: title, author,year, and genre."
      );
      next(err);
      return;
    }

    // Get the total nummber idems
    db.get("SELECT COUNT(*) AS count FROM books", (err, rows) => {
      if (err) {
        const error = new CustomeError(err.message, 505);
        next(error);
        return;
      }
      const nextId = rows.count + 1; // Increament to get the next book number

      // custome id  foramt as 'B001'
      let customId = "";
      if (nextId >= 0 && nextId < 10) {
        customId = `B00${nextId}`;
      } else if (nextId >= 10 && nextId < 100) {
        customId = `B0${nextId}`;
      } else if (nextId >= 100 && nextId < 1000) {
        customId = `B${nextId}`;
      } else if (nextId >= 1000) {
        const err = new CustomeError(
          "Memory occupied please contact developers",
          505
        );
        next(err);
        return;
      }

      // SQl querry to insert the new book
      const sql = `INSERT INTO books (id, title, author, genre) VALUES (?,?,?,?)`;
      db.run(sql, [customId, title, author, genre], (err, row) => {
        if (err) {
          const error = new CustomeError("Error Inserting Book", 505);
          next(error);
          return;
        }

        res.status(200).json({
          status: "success",
          message: "Book successfully added",
        });
      });
    });
  },

  getBookById: (req, res, next) => {
    const bookId = req.params.id;
    console.log(bookId);

    db.get("SELECT * FROM books WHERE id = ?", [String(bookId)], (err, row) => {
      if (err) {
        const error = new CustomeError(err.message, 500);
        next(error);
        return;
      }

      console.log(`${row}`);

      if (!row) {
        const err = new CustomeError("No record found");
        next(err);
        return;
      }

      res.status(200).json({
        book: row,
        status: "success",
        message: "Book details recieve successfully.",
      });
    });
  },

  updateBookDetails: (req, res, next) => {
    const bookId = req.params.id; // get the id from url
    const { title, author, genre } = req.body; // get the values to be updated

    if (!title || !author || !genre) {
      const err = new CustomeError(
        "Title, author and genre are requiered fields",
        400
      );
      next(err);
      return;
    }

    db.run(
      "UPDATE books SET title = ?, author = ?, genre = ? WHERE id = ?",
      [title, author, genre, String(bookId)],
      (err) => {
        if (err) {
          const error = new CustomeError("Database error", 500);
          next(error);
          return;
        }

        if (this.changes === 0) {
          const error = new CustomeError("Book not found", 500);
          next(error);
          return;
        }

        res.status(200).json({
          status: "success",
          message: "Book details updated successfully.",
        });
      }
    );
  },

  deleteBook: (req, res, next) => {
    const bookId = req.params.id;
    console.log(bookId);

    db.run("DELETE FROM books WHERE id = ?", [String(bookId)], (err) => {
      if (err) {
        const error = new CustomeError(err.message, 500);
        next(error);
        return;
      }

      if (this.changes === 0) {
        const error = new CustomeError("Book not found", 500);
        next(error);
        return;
      }

      res.status(200).json({
        status: "success",
        message: "Book deleted successfully.",
      });
    });
  },
};

module.exports = crudFunctions;
