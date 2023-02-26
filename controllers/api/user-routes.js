const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// CREATE new post
router.post('/post', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create(req.params.id, {
      name: req.body.name,
      body: req.body.body,
      date: req.body.date,
      user_id: req.session.user_id,
    });
    const post = dbPostData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new comment with param referencing post id
router.post('/comment/:postid', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create(req.params.id, {
      body: req.body.body,
      date: req.body.date,
      post_id: req.param.postid,
      user_id: req.session.user_id,
    });

    const comment = dbCommentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

// LOGIN
router.post('/login', async (req, res) => {
  try {
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
            req.session.loggedIn = true; // flag that user is authorized
            req.session.user_id = dbUserData[i].id; // user id from the DB for data creation

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

// LOGOUT
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
