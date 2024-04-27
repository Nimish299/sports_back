const coachModel = require('../models/coachModel');
const playerModel = require('../models/playerModel');
const coachPostModel = require('../models/coachPostModel');

const createcoachPost = async (req, res) => {
  try {
    // Extract required fields from the request body
    const { title, description, court, price } = req.body;
    // Get the player's ID from the request
    const coachId = req.coachid;
    // Check if a player post with the same title already exists
    const existingPost = await coachPostModel.findOne({ title });
    if (existingPost) {
      return res
        .status(400)
        .json({ error: 'A player post with this title already exists' });
    }
    // Create the player post including playerInfo
    const coachPost = await coachPostModel.create({
      title,
      description,
      court,
      price,
      createdBy: coachId,
    });

    // Return both the created player post and the player's information
    res.status(201).json();
  } catch (error) {
    console.error('Error creating player post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const coachselfpost = async (req, res) => {
  try {
    // Extract player ID from the request
    const coachId = req.coachid;
    // Find all player posts associated with the player ID
    const coachPosts = await coachPostModel.find({ createdBy: coachId });

    // Return the player posts in the response
    return res.status(200).json(coachPosts);
  } catch (error) {
    console.error('Error fetching player posts:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const allcoachPosts = async (req, res) => {
  // const posts = await playerPostModel.find();
  const coachId = req.coachid;

  // Fetch all posts excluding those created by the player
  const posts = await coachPostModel.find();
  return res.status(200).json(posts);
};
module.exports = { createcoachPost, coachselfpost, allcoachPosts };
