const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const coachPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sport: {
      type: String,
      required: true,
      // enum: ['Football', 'Basketball', 'Tennis', 'Cricket', 'Other'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    createdBy: {
      ///PID
      ref: 'Player', // Assuming a Player model exists
      required: true,
      type: String,
      //   required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    requests: [
      {
        playerId: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
      },
    ],
    accepted: [
      {
        playerId: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    Rejected: [
      {
        playerId: {
          type: String,
          required: true,
        },

        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('coachPost', coachPostSchema);
