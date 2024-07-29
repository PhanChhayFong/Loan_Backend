// routes/customerRoutes.js
const express = require('express');
const upload = require('../config/upload');
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

const router = express.Router();

router.post('/customers', upload.fields([
  { name: 'cust_img', maxCount: 1 },
  { name: 'nid_img', maxCount: 1 }
]), createCustomer);
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id',upload.fields([
  { name: 'cust_img', maxCount: 1 },
  { name: 'nid_img', maxCount: 1 }
]), updateCustomer);
router.delete('/customers/:id', deleteCustomer);

module.exports = router;
