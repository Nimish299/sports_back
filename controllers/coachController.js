const coachModel = require('../models/coachModel');
const playerModel = require('../models/playerModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; //3 days
createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res) => {
  try {
    const {
      name,
      emailID,
      password,
      mobileNumber,
      sport,
      coaching_experience_years,
      certifications,
    } = req.body;

    // Check if coach with the same email already exists
    const existingCoach = await coachModel.findOne({ emailID });
    if (existingCoach) {
      console.log()
      return res.status(400).json({ error: 'Coach already exists' });
    }


    // Create a new coach document with sports expertise
    const coach = await coachModel.create({
      name,
      emailID,
      password,
      mobileNumber,
      sport,
      coaching_experience_years,
      certifications,
      // Add more fields as needed
    });

    // Generate token
    const token = createToken(coach._id);

    // Respond with token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { emailID, password } = req.body;
  console.log(emailID);
  console.log(password);
  try {
    coach = await coachModel.login(emailID, password);
    console.log(coach);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e.message });
  }

  const token = createToken(coach._id);
  // res.cookie('coachid',token, { httpOnly: true, maxAge: maxAge * 1000 })
  console.log('token', token);

  res.status(200).json({ token });
  // res.status(200).json(coach);
};

//we set lifetime to 1 ms so it goes
const logout = async (req, res) => {
  console.log('okkk');
  res.cookie('coachid', '', { maxAge: 1 });
  return res.status(200).json('');
};

const all_applied_Student = async (req, res) => {
  // const posts = await playerPostModel.find();
  try {
    const coachId = req.coachid;
    const coach = await coachModel.findById(coachId);

    // If coach not found
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    const appliedStudents = coach.applied_students;
    // Fetch all posts excluding those created by the player
    return res.status(200).json(appliedStudents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
  logout,
  all_applied_Student,
};
