const { Schema, model } = require('mongoose');

const tokenSchema = Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Token', tokenSchema);
