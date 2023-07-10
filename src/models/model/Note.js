const mongoose = require('mongoose');
const { NoteSchema } = require('../schemas');

const Note = mongoose.model('Note', NoteSchema);

const noteDAO = {
  async getAllNotes() {
    const notes = await Note.find({}).lean();

    return notes;
  },

  async getAllNotesBySearch(search) {
    const notes = [
      ...(await Note.find({ type: { $regex: new RegExp(search, 'i') } })
        .select('_id')
        .lean()),
    ].map(({ _id }) => _id);

    return notes;
  },

  async getNoteByNoteId(noteId) {
    const note = await Note.findOne({ _id: noteId }).lean();

    return note;
  },

  async getNoteByNoteType(noteType) {
    const note = await Note.findOne({ type: noteType }).lean();

    return note;
  },

  async createNote({ type }) {
    const note = await Note.create({ type });

    return note;
  },

  async updateNoteByNoteId(noteId, updateInfo) {
    await Note.findByIdAndUpdate(noteId, updateInfo).lean();
  },

  async updateNoteByNoteType(noteType, updateInfo) {
    await Note.findOneAndUpdate({ type: noteType }, updateInfo).lean();
  },

  async deleteNoteByNoteId(noteId) {
    const { deletedCount } = await Note.deleteOne({ _id: noteId }).lean();

    return deletedCount;
  },

  async deleteNoteByNoteType(noteType) {
    const { deletedCount } = await Note.deleteOne({ type: noteType }).lean();

    return deletedCount;
  },
};

module.exports = noteDAO;
