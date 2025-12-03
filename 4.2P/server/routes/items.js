const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/itemsController');

router.get('/', ctrl.getAllRecords);
router.get('/:id', ctrl.getRecord);
router.post('/', ctrl.createRecord);
router.delete('/:id', ctrl.deleteRecord);

module.exports = router;
