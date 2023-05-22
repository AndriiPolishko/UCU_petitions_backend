const mongoose = require('mongoose');
const petitionSchema = mongoose.Schema({
  // id: {
  //   type: String,
  //   required: [true, 'Enter an id'],
  // },
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
  voters: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Petition', petitionSchema);
