const User = require('../models/user.model')

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

}

const getAllusers = async (req, res) => {
   
    try{
        const users =await User.find()
        res.status(200).json({
            users
        })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


module.exports = {
    register,
    getAllusers
}