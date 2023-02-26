const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    //const validEm = await dbUserData.checkEmail(req.body.email);
    //const hashEm = await bcrypt.hash(req.body.email,10);

    const dbUserData = await User.findAll();
    let match = false;
    for (let i = 0; (i < dbUserData.length) && (!match); i++) {
      match = await bcrypt.compare(req.body.email, dbUserData[i].email);

      if (match) { // email matched

        const validPassword = await dbUserData[i].checkPassword(req.body.password);
        if (!validPassword) { // password did not match
          match = false;
          res
            .status(400)
            .json({ message: 'Incorrect password. Please try again!' });
          return;
        } else { // e-mail and password matched
          await req.session.save(() => {
            req.session.loggedIn = true;

            res
              .status(200)
              .json({ user: dbUserData, message: 'You are now logged in!' });
          });
          return;
        }
      }


    }


    if (!match) {
      res
        .status(400)
        .json({ message: 'Incorrect email. Please try again!' });
      return;
    }


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
