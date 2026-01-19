const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/add', taskController.createTask);
router.get('/:user_id', taskController.getTasks);
router.put('/:id', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);
router.delete('/clear-completed/:user_id', taskController.clearCompleted);

module.exports = router;