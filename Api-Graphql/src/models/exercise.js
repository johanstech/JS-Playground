const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Provide a Name.'],
      unique: true,
    },
    bodySections: [
      {
        type: String,
        required: [true, 'Provide a Body Section.'],
      },
    ],
    bodyParts: [
      {
        type: String,
        required: [true, 'Provide a Body Part.'],
      },
    ],
    description: {
      type: String,
      required: [true, 'Provide a Description.'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Exercise', exerciseSchema);
