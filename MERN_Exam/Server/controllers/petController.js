const Pet = require("../models/pet.model")


const createPet = async (req, res) => {

    try {
        const petExists = await Pet.findOne({ name: req.body.name });

        if (petExists) {
            res.status(400);
           return res.json({message:'Pet already exists'});
        }
        const { name, type, description, skills } = req.body;


    const pet = new Pet({
      name,
      type,
      description,
      skills
    });


    const validationError = pet.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }


    const savedPet = await pet.save();

    res.json(savedPet);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

const getPets = async (req, res) => {

    try {
        const pets = await Pet.find().sort({ type: 1 }); 
        res.json(pets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}
const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.json(pet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const updatePet = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, type, description, skills } = req.body;
    
    
        const pet = await Pet.findById(id);
        if (!pet) {
          return res.status(404).json({ error: 'Pet not found' });
        }
    

        pet.name = name;
        pet.type = type;
        pet.description = description;
        pet.skills = skills;
    

        const validationError = pet.validateSync();
        if (validationError) {
          return res.status(400).json({ error: validationError.message });
        }
        const savedPet = await pet.save();
    
        res.json(savedPet);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}
const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createPet,
    getPets,
    getPetById,
    updatePet,
    deletePet
}