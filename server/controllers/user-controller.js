const db = require('../models/models.js');
const userController = {};
const bcrypt = require('bcrypt');

// create user

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  const SALT_WORK_FACTOR = 10;
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPass = await bcrypt.hash(password, salt);

    res.locals.username = username;
    res.locals.password = hashedPass;

    const createUserQuery = `
    INSERT INTO public.user (name, password) 
    VALUES ('${username}','${hashedPass}')`;

    await db.query(createUserQuery);
    return next();
  } catch (err) {
    res.send({ err: 'User was not able to be created' });
    return next({ error: err });
  }
};

// verify user

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  const checkUserNameExist = `SELECT * FROM public.user WHERE name = '${username}'`;
  const user = await db.query(checkUserNameExist);
  const userRow = user.rows[0];

  if (!user.rows) {
    return res.status(404).json({ name: 'This user does not exist' });
  }

  const isMatch = await bcrypt.compare(password, userRow.password);

  if (isMatch) {
    console.log("we're in!");
    res.locals.username = userRow.name;
    res.locals.id = userRow._id;
    console.log(res.locals);
    return next();
  } else {
    res.send({ err: 'Validation failed' });
    return next({
      error: 'Username and Password combination was not found.',
      status: 401,
    });
  }
};

module.exports = userController;
