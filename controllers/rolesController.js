// rolesController.js

const db = require('../models');
const Roles = db.Roles;
const rolesModel= require('../models/roles');

// rolesController.js

const obtenerRoles = async (req, res) => {
    try {
        // Lógica para obtener roles desde la base de datos
        const roles = await rolesModel().findAll(); // Reemplaza con tu lógica
        console.log('Roles obtenidos:', roles);
        res.json({ roles });
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const crearRol = async (req, res) => {
    try {
        const nuevoRol = await Roles.create(req.body);
        return res.status(201).json(nuevoRol);
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear el rol' });
    }
};

const actualizarRol = async (req, res) => {
    const { id } = req.params;

    try {
        const [numFilasActualizadas, rolesActualizados] = await Roles.update(req.body, {
            where: { role_id: id },
            returning: true,
        });

        if (numFilasActualizadas > 0) {
            return res.status(200).json(rolesActualizados[0]);
        } else {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el rol' });
    }
};

const eliminarRol = async (req, res) => {
    const { id } = req.params;

    try {
        const numFilasEliminadas = await Roles.destroy({
            where: { role_id: id },
        });

        if (numFilasEliminadas > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el rol' });
    }
};

module.exports = {
    obtenerRoles,
    crearRol,
    actualizarRol,
    eliminarRol,
};
