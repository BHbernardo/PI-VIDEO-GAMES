const { User } = require('../db');

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send("Missing data");

    const user = await User.findOrCreate({
        where: {
            email,
            password
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