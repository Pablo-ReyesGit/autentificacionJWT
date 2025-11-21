// Utilizamos module.exports para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
    // usamos sequelize.define para "definir" el nombre de la entity en la BD, en este caso "student"
    // Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Membresia = sequelize.define("membresia", {

        carnet_cliente: {
            type: Sequelize.STRING
        },

        nombre_cliente: {
            type: Sequelize.STRING
        },

        mes: {
            type: Sequelize.ENUM("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"),
            defaultValue: "enero"
        },

        anio: {
            type: Sequelize.INTEGER   // equivale a TIMESTAMP WITH TIME ZONE
        },

        tipo: {
            type: Sequelize.ENUM("VIP", "Normal", "Smart"),
            defaultValue: "Normal"
        }
    })

    return Membresia
}