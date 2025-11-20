const db = require("../models");
const Matricula = db.matriculas;  // ← Evita conflictos de nombre
const Op = db.Sequelize.Op;

// Crear un nuevo libro
exports.create = (req, res) => {
    if (!req.body.carnet_estudiante || req.body.carnet_estudiante.trim() === "") {
        return res.status(400).send({ 
            message: "El carnet no debe estar vacio." 
        });
    }
    if(!req.body.fecha_matricula || req.body.fecha_matricula.trim() === ""){
        return res.status(400).send({
            message: "La fecha de la matricula no debe estar vacia."
        });
    }
    if(!req.body.matricula || req.body.matricula.trim() === ""){
        return res.status(400).send({
            message: "El numero de matricula no debe estar vacia."
        });
    }
    const nuevaMatricula = {
        carnet_estudiante: req.body.carnet_estudiante,
        fecha_matricula: req.body.fecha_matricula,
        matricula: req.body.matricula
    };

    Matricula.create(nuevaMatricula)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ 
                message: err.message || "Error al crear el Administrador." 
            });
        });
};

exports.findAll = (req, res) => {
    const carnet = req.query.carnet;
    var condition = carnet ? { carnet: { [Op.iLike]: `%${carnet}%` } } : null;

    Matricula.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        });
};

// Obtener un solo libro por ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).send({
            message: "El ID de la matricula no puede estar vacío."
        });
    }
    Matricula.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Matricula  no encontrado." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar Matricula con ID=" + id });
        });
};

// Actualizar libro
exports.update = (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).send({
            message: "El ID del administrador no puede estar vacío."
        });
    }
    Matricula.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Matricula actualizada correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar matricula con ID=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar Matricula con ID=" + id });
        });
};

// Eliminar un libro
exports.delete = (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).send({
            message: "El ID de matricula no puede estar vacío."
        });
    }
    Matricula.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "matricula eliminada correctamente." });
            } else {
                res.send({ message: `No se encontró matricula con ID=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al eliminar matricula con ID=" + id });
        });
};