const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Books = require("../models/Books");
const bookCtrl = require("../controllers/books.js");

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.get("/bestrating", bookCtrl.getBestRating);
router.post("/", auth, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.addRating);
router.put("/:id", auth, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
