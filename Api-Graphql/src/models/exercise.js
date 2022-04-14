const { Schema, model } = require('mongoose');

const exerciseSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bodySections: [
      {
        type: String,
        required: true,
      },
    ],
    bodyParts: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Exercise', exerciseSchema);
