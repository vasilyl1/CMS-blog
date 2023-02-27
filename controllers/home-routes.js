const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
// Import the custom middleware

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
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DASHBOARD - GET all user posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
      where: {
        user_id : req.session.user_id,
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

// add comment for the post id
router.get('/addcomment/:id',withAuth, (req,res) => {
  
  // form to get the comment content to be rendered here

  res.render('input',{hdr:"New Comment", loggedIn: req.session.loggedIn});

  
});

module.exports = router;
