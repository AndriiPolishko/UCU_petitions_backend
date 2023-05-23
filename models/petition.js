const mongoose = require('mongoose');
const petitionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter a petition name'],
  },
  author: {
    type: String,
    required: [true, 'Enter an id'],
  },
  date: {
    type: Date,
    required: [true, 'Enter a creation date'],
  },
  description: { type: String, required: [true, 'Enter a description'] },
  shortDescription: {
    type: String,
    required: [true, 'Enter a short description'],
  },
  votes: { type: Number },
  votesNeeded: { type: Number, required: [true, 'Enter a short description'] },
  answer: {
    author: String,
    text: String,
  },
  voters: [
    {
      id: {
        type: Number,
        required: [true, "Enter an Id"]
      },
      name: {
        type: String,
        required: [true, "Enter a name"]
      },
      email: {
        type: String,
      }
    },
  ],
});

module.exports = mongoose.model('Petition', petitionSchema);
