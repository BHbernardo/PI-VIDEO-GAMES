const { User } = require("../db");

const login = async (req, res) => {
    try {
        const { email, password } = req.query;

        if(!email || !password) return res.status(400).send("Missing data");

        // Busca al usuario en la base de datos por su "EMAIL";
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if(!user) return res.status(404).send("User not found");

    // Compara si la contraseña del usuario es igual a la ya almacenada;

        const userid = user.id;

        return user.password === password
        ? res.status(200).json( { access: true, userid } )
        : res.status(403).send("Invalid Password");
    } catch (error) {
        res.status(500).json( { error: error.message } );
    };
};

module.exports = {
    login,
}