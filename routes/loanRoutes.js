// routes/loanRoutes.js
const express = require('express');
const {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
} = require('../controllers/loanController');

const router = express.Router();

router.post('/loans', createLoan);
router.get('/loans', getLoans);
router.get('/loans/:id', getLoanById);
router.put('/loans/:id', updateLoan);
router.delete('/loans/:id', deleteLoan);

module.exports = router;
