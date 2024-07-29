// routes/roleRoutes.js
const express = require('express');
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  getRoleNameById,
} = require('../controllers/roleController');

const router = express.Router();

router.post('/roles', createRole);
router.get('/roles', getRoles);
router.get('/roles/:id', getRoleById);
router.get('/roles_name/:roleId', getRoleNameById);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

module.exports = router;
