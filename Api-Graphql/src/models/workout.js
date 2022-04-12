const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    unit: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    elapsedTime: {
      type: Number,
      required: true,
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
    exercises: [
      {
        name: {
          type: String,
          required: true,
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
        sets: [
          {
            weight: {
              type: Number,
              required: true,
            },
            repetitions: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Workout', workoutSchema);
