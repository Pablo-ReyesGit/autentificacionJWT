const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

try {
  db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'usuario' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'usuario':", err.message);
}

try {
  db.matriculas = require("./matricula.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'matricula' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'matricula':", err.message);
}

try {
  db.membresias = require("./membresia.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'membresia' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'membresia':", err.message);
}
module.exports = db;