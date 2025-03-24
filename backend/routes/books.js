const express = require("express");
const router = express.Router();

const Books = require("../models/Books");
const bookCtrl = require("../controllers/books.js");

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.get("/bestrating", bookCtrl.getBestRating);
// router.post("/", bookCtrl.createBook);
// router.post("/:id/rating", bookCtrl.addRating);
// router.put("/:id", bookCtrl.modifyBook);
// router.delete("/:id", bookCtrl.deleteBook);

module.exports = router;
