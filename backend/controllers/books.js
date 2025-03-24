const Books = require("../models/Books.js");
const fs = require("fs");

exports.getAllBooks = async (req, res) => {
  Books.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneBook = (req, res) => {
  Books.findOne({ _id: req.params.id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.getBestRating = (req, res) => {
  Books.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Books({
    ...bookObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json(book))
    .catch((error) => res.status(400).json({ error }));
};

exports.addRating = (req, res) => {
  const { userId, rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ error: "La note doit être comprise entre 0 et 5." });
  }

  Books.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Livre non trouvé." });
      }

      const existingRating = book.ratings.find((r) => r.userId === userId);
      if (existingRating) {
        return res.status(400).json({ error: "Vous avez déjà noté ce livre." });
      }

      book.ratings.push({ userId, grade: rating });

      const totalRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
      book.averageRating = totalRatings / book.ratings.length;

      book
        .save()
        .then((updatedBook) => res.status(200).json(updatedBook))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyBook = (req, res) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Books.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre modifié!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res) => {
  Books.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Livre non trouvé." });
      }

      Books.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Livre supprimé!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
