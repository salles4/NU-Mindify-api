const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const terms = require('../controllers/terms.controller')
const progress = require('../controllers/progress.controller')
const chats = require('../controllers/chats.controller')

router.get('/', (req, res) => res.send(`
  <title>NU Mindify API</title>
  <h1>NU Mindify API</h1>
  <div>Example Usage: <a href="https://nu-mindify-api.vercel.app/api/getTerms">https://nu-mindify-api.vercel.app/api/getTerms</a></div>
  <style>*{text-align:center}</style>
  `))

router.get('/getUsers', users.getUsers);
router.get('/getUser/:uid', users.getUser);
router.post('/createUser', users.createUser);
router.post('/updateUser', users.updateUser);

router.get('/getTerms', terms.getTerms)
router.post('/addTerm', terms.addTerm)

router.get('/getProgress/:id', progress.getUserProgress)
router.post('/progressCategory', progress.progressCategory)

router.get('/getMessages/:id', chats.getMessages);
router.post('/sendMessage', chats.sendMessage)

module.exports = router;