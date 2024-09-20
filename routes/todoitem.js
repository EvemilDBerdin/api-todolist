const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoitem');
const auth = require('../middlewares/auth');

router.post('/:userId', auth, todoController.createTodoItem);
router.get('/user/:userId', auth, todoController.getTodoItems);
router.put('/:id', auth, todoController.updateTodoItem);
router.delete('/:id', auth, todoController.deleteTodoItem); 


module.exports = router;