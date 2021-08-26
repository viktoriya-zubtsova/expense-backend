const User = require('../../db/models/user/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('find-config')('.env') });

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) {
      res.status(400).send('All input is required');
    }

    const oldUser = await User.findOne({ login: login });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      login: login,
      password: encryptedPassword
    });

    const token = jwt.sign(
      { user_id: user._id, login },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      }
    );
    user.token = token;
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await User.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, login },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      await User.updateOne({ login }, { token });
      return res.status(200).send(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(' ')[1];

  if (!token) {
    return res.status(403).send({message: "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token" + err);
  }
  return next();
};

