const express = require('express');
const router = express.Router();
const {
  getPetitions,
  getPetition,
  getPetitionsInProcess,
  addPetition,
  updatePetition,
  deletePetition,
} = require('../controllers/petitionController');

router.route('/').get(getPetitions).post(addPetition);
router.route('/in_process').get(getPetitionsInProcess);
router
  .route('/:id')
  .get(getPetition)
  .put(updatePetition)
  .delete(deletePetition);

module.exports = router;
