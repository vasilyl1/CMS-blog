const { Comment } = require('../models');

const commentdata = [
  {
    body: 'Comment 1 body',
    post_id: 1,
    user_id: 1,
  },
  {
    body: 'Comment 2 body',
    post_id: 1,
    user_id: 1,
  },
  {
    body: 'Comment 3 body',
    post_id: 1,
    user_id: 1,
  },

];

const seedComment = () => Painting.bulkCreate(commentdata);

module.exports = seedComment;
