const db = require("../models");
const Membresia = db.membresias;  // ← Evita conflictos de nombre
const Op = db.Sequelize.Op;

// Crear un nuevo libro
exports.create = (req, res) => {
    if (!req.body.carnet_cliente || req.body.carnet_cliente.trim() === "") {
        return res.status(400).send({ 
            message: "El carnet no debe estar vacio." 
        });
    }
    if(!req.body.nombre_cliente || req.body.nombre_cliente.trim() === ""){
        return res.status(400).send({
            message: "el nombre no debe estar vacio."
        });
    }
    if(!req.body.mes || req.body.mes.trim() === ""){
        return res.status(400).send({
            message: "El mes no debe estar vacio."
        });
    }
    if(!req.body.anio || req.body.anio.trim() === ""){
        return res.status(400).send({
            message: "El año no debe estar vacio."
        });
    }
        if(!req.body.tipo || req.body.tipo.trim() === ""){
        return res.status(400).send({
            message: "El tipo no debe estar vacio."
        });
    }
    const nuevaMembresia = {
        carnet_cliente: req.body.carnet_cliente,
        nombre_cliente: req.body.nombre_cliente,
        mes: req.body.mes,
        anio: req.body.anio,
        tipo: req.body.tipo
    };

    Membresia.create(nuevaMembresia)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ 
                message: err.message || "Error al crear el Administrador." 
            });
        });
};

exports.findAll = (req, res) => {
    const carnet_cliente = req.query.carnet_cliente;
    var condition = carnet_cliente ? { carnet: { [Op.iLike]: `%${carnet}%` } } : null;

    Membresia.findAll({ where: condition })
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
    Membresia.findByPk(id)
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
    Membresia.update(req.body, {
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
    Membresia.destroy({ where: { id: id } })
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