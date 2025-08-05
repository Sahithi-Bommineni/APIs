const express = require('express');
const router = express.Router();

let books = [];

router.post('/', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: Date.now(),
    title,
    author,
    reviews: []
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

//  Get all books (GET /books)
router.get('/', (req, res) => {
  res.json(books);
});

//  Get a single book by ID (GET /books/:id)
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Update a book (PUT /books/:id)
router.put('/:id', (req, res) => {
  const { title, author } = req.body;
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

//  Delete a book (DELETE /books/:id)
router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books.splice(index, 1);
  res.status(204).send(); // No content
});

module.exports = router;
module.exports.books = books;