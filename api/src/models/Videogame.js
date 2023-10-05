const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, // aplicamos UUID para representar un ID único para cada juego.
      defaultValue: DataTypes.UUIDV4, // esta seria la version.
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), // contiene un arreglo de valores, en este caso contendra muchas plataformas.
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT, // aplica porque obtendremos valores decimales que equivalen a un rating en este caso.
      allowNull: false,
      validate: { min: 0, max: 5 },
    },
  },
  { timestamps: false }); // tiempo de creacion;
};




