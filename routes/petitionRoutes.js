const express = require('express');
const router = express.Router();
const {
  getPetitions,
  getPetition,
  addPetition,
  updatePetition,
  deletePetition,
} = require('../controllers/petitionController');

router.route('/').get(getPetitions);
router.route('/').post(addPetition);
router
  .route('/:id')
  .get(getPetition)
  .put(updatePetition)
  .delete(deletePetition);

module.exports = router;
