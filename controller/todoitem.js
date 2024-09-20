const { TodoItem } = require('../models');

// create
exports.createTodoItem = async (req, res) => {
  res.status(201).json(req.params);
  // try {
  //   await TodoItem.create({
  //     ...req.body,
  //     user_id: req.params.id
  //   });
  //   res.status(201).json("Todo-item created successfully");
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
};

// select all todo items
exports.getTodoItems = async (req, res) => {
  try {
    const todoItems = await TodoItem.findAll({ where: { user_id: req.params.userId } });
    res.json(todoItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// select specific items
exports.updateTodoItem = async (req, res) => {
  try {
    const todoItem = await TodoItem.findByPk(req.params.id);
    if (todoItem) {
      await todoItem.update(req.body);
      res.status(201).json("Todo-item updated successfully");
    } else {
      res.status(404).json({ message: 'Todo item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTodoItem = async (req, res) => {
  try {
    const todoItem = await TodoItem.findByPk(req.params.id);
    if (todoItem) {
      await todoItem.destroy();
      res.status(201).json('Todo-item deleted successfully');
    } else {
      res.status(404).json({ message: 'Todo item not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
