const express = require('express');
const router = express.Router();

const { coachmiddle } = require('../middleware/coachMiddleware');

const {
  signup,
  login,
  logout,
  all_applied_Student,
} = require('../controllers/coachController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.use(['/applied/students'], coachmiddle);
router.get('/applied/students', all_applied_Student);
module.exports = router;
