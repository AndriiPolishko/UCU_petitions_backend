const asyncHandler = require('express-async-handler');
const Petition = require('../models/petition');

const getPetitions = asyncHandler(async (req, res) => {
  const sortType = req.query.sort;
  let petitions;
  if (sortType === 'date') {
    petitions = await Petition.find().sort('date');
  } else if (sortType === 'vote') {
    petitions = await Petition.find().sort({ votes: -1 });
  } else {
    throw new Error('The type of sort is incorrect');
  }
  res.status(200).json({ petitions });
});

const getPetition = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const petition = await Petition.find({ id });
  res.status(200).json({ petition });
});

const addPetition = asyncHandler(async (req, res) => {
  const {
    name,
    author,
    date,
    description,
    shortDescription,
    votes,
    votesNeeded,
    voters,
  } = req.body;

  if (
    !name ||
    !author ||
    !date ||
    !description ||
    !shortDescription ||
    !votes ||
    !votesNeeded ||
    !voters
  ) {
    throw new Error('Pass all fields');
  }
  const petition = await Petition.create({
    name,
    author,
    date,
    description,
    shortDescription,
    votes,
    votesNeeded,
    voters,
  });

  res.status(200).json({ petition: petition });
});

const updatePetition = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const petition = await Petition.findById(id);

  if (!petition) {
    res.status(404);
    throw new Error('Petition not found');
  }
  const updatedPetition = await Petition.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPetition);
});

const deletePetition = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const petition = await Petition.findById(id);
  console.log(petition);
  if (!petition) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // Make sure the logged in user matches the goal user
  // if (petition.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  await Petition.findByIdAndDelete(id);

  res.status(200).json({ id });
});

module.exports = {
  getPetitions,
  getPetition,
  addPetition,
  updatePetition,
  deletePetition,
};
