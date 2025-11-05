// Utilizamos module.exports para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
    // usamos sequelize.define para "definir" el nombre de la entity en la BD, en este caso "student"
    // Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Matricula = sequelize.define("matricula", {

        carnet_estudiante: {
            type: Sequelize.STRING
        },

        fecha_matricula: {
            type: Sequelize.DATE   // equivale a TIMESTAMP WITH TIME ZONE
        },

        matricula: {
            type: Sequelize.STRING
        }
    })

    return Matricula
}