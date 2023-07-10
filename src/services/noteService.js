const { ObjectId } = require('mongoose').Types;
const { noteDAO } = require('../models/model');

const noteService = {
  async getAllNotes() {
    const notes = await noteDAO.getAllNotes();

    return notes;
  },

  async getNote(target) {
    const note = ObjectId.isValid(target)
      ? await noteDAO.getNoteByNoteId(target)
      : await noteDAO.getNoteByNoteType(target);

    return note;
  },

  async createNote({ type }) {
    const note = await noteDAO.createNote({ type });

    return note;
  },

  async updateNote(target, { type }) {
    const isObjectId = ObjectId.isValid(target);

    const updateInfo = isObjectId
      ? await noteDAO.getNoteByNoteId(target)
      : await noteDAO.getNoteByNoteType(target);

    updateInfo.type = type;

    if (isObjectId) await noteDAO.updateNoteByNoteId(target, updateInfo);
    else await noteDAO.updateNoteByNoteType(target, updateInfo);
  },

  async deleteNote(target) {
    const deletedCount = ObjectId.isValid(target)
      ? await noteDAO.deleteNoteByNoteId(target)
      : await noteDAO.deleteNoteByNoteType(target);

    return deletedCount;
  },
};

module.exports = noteService;
