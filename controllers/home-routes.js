const router = require('express').Router();
const { Post, Comment, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        }
      ],
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    console.log(posts);
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one comment
router.get('/comment/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const comment = dbCommentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// authenticate the user
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
