const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'Provide a User Id.'],
    },
    unit: {
      type: String,
      required: [true, 'Provide a Unit type(metric/imperial).'],
    },
    date: {
      type: Date,
      required: [true, 'Provide a Date.'],
    },
    elapsedTime: {
      type: Number,
      required: [true, 'Provide Elapsed Time in seconds.'],
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
    exercises: [
      {
        name: {
          type: String,
          required: [true, 'Provide a Name.'],
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
        sets: [
          {
            weight: {
              type: Number,
              required: [true, 'Provide a Weight.'],
            },
            repetitions: {
              type: Number,
              required: [true, 'Provide number of Repetitions.'],
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
