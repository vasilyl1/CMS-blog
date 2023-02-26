const { Comment } = require('../models');

const commentdata = [
  {
    body: 'Comment 1 body',
    date: 'June 30, 2021 17:00:00',
    post_id: 1,
    user_id: 1,
  },
  {
    body: 'Comment 2 body',
    date: 'June 30, 2021 17:00:00',
    post_id: 1,
    user_id: 1,
  },
  {
    body: 'Comment 3 body',
    date: 'June 30, 2021 17:00:00',
    post_id: 3,
    user_id: 2,
  },

];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
