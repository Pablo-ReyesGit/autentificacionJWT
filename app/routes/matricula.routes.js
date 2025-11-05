// routes/docente.routes.js
module.exports = app => {
  const matricula = require("../controllers/matricula.controller.js");
  var router = require("express").Router();

  // Crear Docente
  /**
   * @swagger
   * /api/matricula/create/:
   *   post:
   *     summary: Crear docente
   *     tags: [Docente]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                carnet:
   *                  type: string
   *                fecha_matricula:
   *                  type: string
   *                  format: date
   *                matricula:
   *                  type: string
   *                  format: date
   *     responses:
   *       201:
   *         description: Docente creado exitosamente
   *       400:
   *         description: Error en la petición
   *       500:
   *         description: Error en el servidor
   */
  router.post("/create/", matricula.create);

  // Obtener todos los docentes
  /**
   * @swagger
   * /api/matricula/:
   *   get:
   *     summary: Obtener todos los docentes
   *     tags: [Docente]
   *     responses:
   *       200:
   *         description: Lista de docentes
   *       500:
   *         description: Error en el servidor
   */

   router.get("/:id", matricula.findOne);

  /**
   * @swagger
   * /api/matricula/update/{id}:
   *   put:
   *     summary: Actualiza una materia por ID
   *     tags:
   *       - Materia
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la materia
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *                 example: "Programación Avanzada"
   *               creditos:
   *                 type: integer
   *                 example: 6
   *               cupo_maximo:
   *                 type: integer
   *                 example: 40
   *               Obligacion:
   *                 type: boolean
   *                 example: false
   *               nombre_carrera:
   *                 type: string
   *                 example: "Ingeniería en Sistemas"
   *     responses:
   *       200:
   *         description: Materia actualizada exitosamente
   *       404:
   *         description: Materia no encontrada
   *       500:
   *         description: Error al actualizar
   */

  router.get("/", matricula.findAll);

  
 
     //Obtener estudiante por nombre
    /**
   * @swagger
   * /api/matricula/{id}:
   *   get:
   *     summary: Obtener estudiante por nombre
   *     tags: [Docente]
   *     parameters:
   *        - in: path
   *          name: nombre
   *          type: integer
   *     description: Obtener estudiante por nombre
   *     responses:
   *       200:
   *         description: Estudiante encontrado
   */
  //Obtener por id estudiante
  router.get("/:id", matricula.findOne);

  // Update Docente
  /**
   * @swagger
   * /api/matricula/update/{id}:
   *   put:
   *     summary: Actualizar datos de un docente
   *     tags: [Docente]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: Docente actualizado
   *       404:
   *         description: No se encontró el docente
   *       500:
   *         description: Error en el servidor
   */
  
  router.put("/update/:id", matricula.update);

  // Delete Docente
  /**
   * @swagger
   * /api/matricula/delete/{id}:
   *   delete:
   *     summary: Eliminar un docente
   *     tags: [Docente]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Docente eliminado
   *       404:
   *         description: No se encontró el docente
   *       500:
   *         description: Error en el servidor
   */
  router.delete("/delete/:id", matricula.delete);

  app.use("/api/matricula", router);
};