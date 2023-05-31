const express  = require('express')
const {getPetById, createPet, deletePet, getPets, updatePet}  = require('../controllers/petController')

const petRoutes = express.Router();


petRoutes.route('/').get(getPets);
petRoutes.route('/create').post(createPet);
petRoutes.route('/pet/:id').get(getPetById);
petRoutes.route('/update-pet/:id').put(updatePet);
petRoutes.route('/delete/:id').delete(deletePet);

module.exports = petRoutes