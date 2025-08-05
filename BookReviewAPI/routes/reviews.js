const express = require('express');
const router = express.Router();
const { books } = require('./books');

router.post('/:id/reviews', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { reviewer, comment, rating } = req.body;
  const newReview = {
    id: Date.now(),
    reviewer,
    comment,
    rating
  };

  book.reviews.push(newReview);
  res.status(201).json(newReview);
});

// ⭐ Get all reviews for a book (GET /books/:id/reviews)
router.get('/:id/reviews', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  res.json(book.reviews);
});

// ⭐ Delete a review (DELETE /books/:bookId/reviews/:reviewId)
router.delete('/:bookId/reviews/:reviewId', (req, res) => {
  const book = books.find(b => b.id == req.params.bookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const reviewIndex = book.reviews.findIndex(r => r.id == req.params.reviewId);
  if (reviewIndex === -1) return res.status(404).json({ error: 'Review not found' });

  book.reviews.splice(reviewIndex, 1);
  res.status(204).send();
});

module.exports = router;
