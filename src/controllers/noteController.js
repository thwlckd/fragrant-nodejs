const { noteService } = require('../services');

const noteController = {
  async getAllNotes(req, res) {
    const notes = await noteService.getAllNotes();

    res.json({ notes });
  },

  async getNote(req, res) {
    const { target } = req.params;
    const note = await noteService.getNote(target);

    res.json({ note });
  },

  async createNote(req, res) {
    const { noteType: type } = req.body;

    const note = await noteService.createNote({ type });

    res.status(201).json({ note });
  },

  async updateNote(req, res) {
    const { target, noteType: type } = req.body;

    await noteService.updateNote(target, { type });

    res.status(201).end();
  },

  async deleteNote(req, res) {
    const { target } = req.params;

    const deletedCount = await noteService.deleteNote(target);

    res.json({ deletedCount });
  },
};

module.exports = noteController;
