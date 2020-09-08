const express = require('express')

const router = express.Router()

const todoController = require('./../controllers/todo')

router.route('/')
    .get(todoController.getAllData)
    .post(todoController.postData)

router.route('/:noteId')
    .get(todoController.getDataById)
    .put(todoController.updateData)
    .delete(todoController.deleteData)

module.exports = router;
