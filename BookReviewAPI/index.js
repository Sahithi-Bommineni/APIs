const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');
const reviewsRoutes = require('./routes/reviews');

const PORT = process.env.PORT || 3000;

app.use(express.json());


// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API!');
});

// Use routes
app.use('/books', bookRoutes);
app.use('/books', reviewsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});