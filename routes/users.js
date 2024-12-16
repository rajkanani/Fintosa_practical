var express = require('express');
var mongoose = require("mongoose");
var user = mongoose.model("user");
const { jwtSign, jwtVerify } = require('../helpers/jwt');
const bcrypt = require('bcrypt');
var router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  try {
    const item = await user.findOne({ email });

    if (!item) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = bcrypt.compareSync(password, item.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = await jwtSign({ id: item._id, role: item.role }, '5h');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});


router.get('/protected', jwtVerify, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
