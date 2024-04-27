const express = require('express');
const router = express.Router();

const { coachmiddle } = require('../middleware/coachMiddleware');

const {
  createcoachPost,
  coachselfpost,
} = require('../controllers/coachPostController');

router.use(['/create', '/allselfpost'], coachmiddle);

router.post('/create', createcoachPost);
router.get('/allselfpost', coachselfpost);
// router.post('/getpostsbyids', getpostsbyids);
module.exports = router;
