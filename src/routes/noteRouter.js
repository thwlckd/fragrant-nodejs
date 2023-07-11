const { Router } = require('express');
const { noteController } = require('../controllers');
const asyncHandler = require('../middlewares/asyncHandler');

const noteRouter = Router();

noteRouter.get('/', asyncHandler(noteController.getAllNotes));
noteRouter.get('/:target', asyncHandler(noteController.getNote));
noteRouter.post('/', asyncHandler(noteController.createNote));
noteRouter.patch('/', asyncHandler(noteController.updateNote));
noteRouter.delete('/:target', asyncHandler(noteController.deleteNote));

module.exports = noteRouter;
