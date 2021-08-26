const express = require('express');
const router = express.Router();

const {
  getAllItems,
  createNewItem,
  changeItemInfo,
  deleteItem
} = require('../controllers/item.controller');

const {
  createNewUser,
  verifyToken,
  loginUser
} = require('../controllers/user.controller');

router.get('/items', verifyToken, getAllItems);
router.post('/items', verifyToken, createNewItem);
router.patch('/items/:id', verifyToken, changeItemInfo);
router.delete('/items/:id', verifyToken, deleteItem);
router.post('/register', createNewUser);
router.post('/login', loginUser);

module.exports = router;
