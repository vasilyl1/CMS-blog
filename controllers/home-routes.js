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
    const editPost = (req.session.user_id == dbPostData.user_id); // check if the post belongs to auth user
    res.render('post', { post, loggedIn: req.session.loggedIn, editPost: editPost });
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
    const editComment = (req.session.user_id == dbCommentData.user_id); // check if the comment belongs to auth user
    res.render('comment', { comment, loggedIn: req.session.loggedIn, editComment: editComment });
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
router.get('/addcomment/:id', withAuth, (req, res) => {
  // form to get the comment content to be rendered here
  res.render('input', { hdr: "New Comment", loggedIn: req.session.loggedIn });
});

// add new post request
router.get('/addpost', withAuth, (req, res) => {
  // form to get the comment content to be rendered here
  res.render('input1', { hdr: "New Post", loggedIn: req.session.loggedIn });
});

// edit post request
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    // form to get the comment content to be rendered here
    await res.render('input2', {post,loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete post request
router.get('/deletepost/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    // form to get the comment content to be rendered here
    await res.render('input3', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// edit comment
router.get('/editcomment/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Comment.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    // form to get the comment content to be rendered here
    await res.render('input4', {post,loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete comment
router.get('/deletecomment/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Comment.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    // form to get the comment content to be rendered here
    await res.render('input5', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
