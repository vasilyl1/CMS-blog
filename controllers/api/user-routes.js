const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new post
router.post('/post', withAuth, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const dbPostData = await Post.create(req.body);
    const post = dbPostData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE post
router.put('/post/:id', withAuth, async (req, res) => {
  try {
    let dbPostData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE post
router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    let dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
      }
    });
    dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new comment with param referencing post id
router.post('/comment/:id', withAuth, async (req, res) => {
  try {
    req.body.post_id = req.params.id;
    req.body.user_id = req.session.user_id;
    const dbCommentData = await Comment.create(req.body);

    const comment = dbCommentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE comment
router.put('/comment/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    const comment = dbPostData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE comment
router.delete('/comment/:id', withAuth, async (req, res) => {
  try {
    const curPost = req.body.post_id;
    let dbPostData = await Comment.destroy(req.body, {
      where: {
        id: req.params.id,
      }
    });
    dbPostData = await Post.findByPk(curPost, {
      include: [
        {model: Comment,},
        {model: User},
      ]
    });
    const post = dbPostData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', withAuth, async (req, res) => {
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
