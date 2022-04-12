const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Provide an Email.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Provide a Password.'],
    },
    name: {
      type: String,
      required: [true, 'Provide Name.'],
    },
    gender: {
      type: String,
      required: [true, 'Provide Gender.'],
    },
    height: {
      type: Number,
      required: [true, 'Provide Height.'],
    },
    weight: {
      type: Number,
      required: [true, 'Provide Weight.'],
    },
    unit: {
      type: String,
      required: [true, 'Provide a Unit type(metric/imperial).'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
