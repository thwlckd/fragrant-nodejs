const { Schema } = require('mongoose');

const NoteSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: 'Note',
    timestamps: true,
  },
);

module.exports = NoteSchema;
