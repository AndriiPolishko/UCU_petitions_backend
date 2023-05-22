const asyncHandler = require('express-async-handler');
const Petition = require('../models/petition');

const getPetitions = asyncHandler(async (req, res) => {
  const petitions = await Petition.find();
  res.status(200).json({ petitions });
});

const getPetition = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const petition = await Petition.find({ id });
  res.status(200).json({ petition });
});

const addPetition = asyncHandler(async (req, res) => {
  const {
    id,
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
    !id ||
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
    //id,
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
  console.log(updatedPetition);
  res.status(200).json(updatedPetition);
});

const deletePetition = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deletedPetition = await Petition.findByIdAndDelete(id);
  res.status(200).json(deletedPetition);
});

module.exports = {
  getPetitions,
  getPetition,
  addPetition,
  updatePetition,
  deletePetition,
};
