const { User } = require('../db');
const bcrypt = require("bcrypt");

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send("Missing data");

    const rounds = 10;
    const hashPassword = await bcrypt.hash(password, rounds);

    const user = await User.findOrCreate({
        where: {
            email,
            password: hashPassword,
        }
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  
}

module.exports = {
    postUser,
}