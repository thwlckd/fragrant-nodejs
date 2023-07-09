const mongoose = require('mongoose');
const { NoteSchema } = require('../schemas');

const Note = mongoose.model('Note', NoteSchema);

const NoteDAO = {
  async getAllNotes() {
    const notes = await Note.find({});

    return notes;
  },

  async getNoteByNoteId(noteId) {
    const note = await Note.findOne({ _id: noteId });

    return note;
  },

  async getNoteByNoteType(noteType) {
    const note = await Note.findOne({ type: noteType });

    return note;
  },

  async createNote({ noteType }) {
    const note = await Note.create({ type: noteType });

    return note;
  },

  async updateNoteByNoteId(noteId, updateInfo) {
    await Note.findByIdAndUpdate(noteId, updateInfo);
  },

  async updateNoteByNoteType(noteType, updateInfo) {
    await Note.findOneAndUpdate({ type: noteType }, updateInfo);
  },

  async deleteNoteByNoteId(noteId) {
    await Note.deleteOne({ _id: noteId });
  },

  async deleteNoteByNoteType(noteType) {
    await Note.deleteOne({ type: noteType });
  },
};

module.exports = NoteDAO;
