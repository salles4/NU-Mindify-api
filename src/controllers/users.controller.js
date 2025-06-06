const UsersModel = require('../models/Users');
const ProgressModel = require('../models/Progress')

async function getUsers(req, res) {
  try {
    const users = await UsersModel.find()
    res.json(users)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
}

async function getUser(req, res){
  try {
    const uid = req.params.uid
    
    const user = await UsersModel.findOne({ uid })
    res.json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
}

async function createUser(req, res){
  try {
    const newUser = new UsersModel(req.body);
    const user = await newUser.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ error })
  }
}

async function updateUser(req, res) {
  try {
    const { user_id, avatar, cloth, username } = req.body
    const result = await UsersModel.findByIdAndUpdate(
      user_id,
      { $set: { avatar, cloth, username }},
      { new: true, runValidators: true }
    )
    console.log("UpdateUser:",result);
    res.json( result )
  } catch (error) {
    res.status(500).json({error})
  }
}

async function userBuy(req, res) {
  const {user_id, item} = req.query
  try {
    const newData = await UsersModel.findByIdAndUpdate(
      user_id,
      { $push: { items: item }, $inc: {points: -5} },
      { new: true } 
    )
    res.json(newData)
  } catch (error) {
    res.status(500).json({error})
  }
}

async function addPoints(req, res){
  const { user_id, stars } = req.query
  try {
    const newData = await UsersModel.findByIdAndUpdate(
      user_id,
      { $inc: { points: stars } },
      { new: true }
    )
    res.json(newData)
  } catch (error) {
    res.status(500).json({ error })
  }
}

async function removeTutorial(req, res) {
  try {
    const { user_id, tutorial } = req.query
    console.log(req.query);
    
    const tutorialPath = `tutorial.${tutorial}`
    const result = await UsersModel.findByIdAndUpdate(
      user_id,
      { $set: {[tutorialPath]: false}},
      { new: true, runValidators: true }
    )
    console.log(result);
    
    res.json(result)
  } catch (error) {
    res.status(500).json({error})
  }
}

async function deleteStudent(req, res) {
  try {
    const { user_id, is_deleted } = req.body;

    const deletedUser = await UsersModel.findByIdAndUpdate(
      user_id,
      { $set: { "is_deleted": is_deleted } },
      { new: true, runValidators: true }
    );
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, removeTutorial, deleteStudent, userBuy, addPoints }