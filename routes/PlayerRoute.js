const express = require('express');
const router = express.Router();

const { playermiddle } = require('../middleware/playerMiddleware');

const {
  signup,
  login,
  logout,
  profile,
  updateProfile,
  applied,
  applytoacad,
  leaveacad,
  addtostarred,
  starred,
  removefromstarred,
  fetchPlayerInfo,
  check,
  please_tell_me_if_it_is_starred,
  fetch_coach_info
} = require('../controllers/playerController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.use(
  [
    '/applytoacad',
    '/applied',
    '/leaveacad',
    '/profile',
    '/addtostarred',
    '/starred',
    '/removefromstarred',
    '/updateProfile',
    '/fetchPlayerInfo',
    '/check',
    '/tellifstarred',
    '/fetch_coach_info',
  ],
  playermiddle
);
router.get('/check', check);
router.get('/profile', profile);
router.get('/profile/info', fetchPlayerInfo);
router.put('/updateProfile', updateProfile);
router.post('/applytoacad', applytoacad);
router.get('/applied', applied);
router.delete('/leaveacad', leaveacad);

router.post('/addtostarred', addtostarred);
router.get('/starred', starred);
router.delete('/removefromstarred', removefromstarred);
router.get('/tellifstarred/:_id', please_tell_me_if_it_is_starred);

// coach

router.get('/fetch_coach_info/:_id', fetch_coach_info);
module.exports = router;
