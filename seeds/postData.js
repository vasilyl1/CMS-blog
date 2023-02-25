const { Post } = require('../models');

const postdata = [
  {
    name: 'Post 1 header',
    body: 'Post 1 body',
    date: 'June 21, 2021 17:00:00',
    user_id: 1,
  },
  {
    name: 'Post 2 header',
    body: 'Post 2 body',
    date: 'June 21, 2021 17:00:00',
    user_id: 1,
  },
  {
    name: 'Post 3 header',
    body: 'Post 3 body',
    date: 'June 21, 2021 17:00:00',
    user_id: 1,
  },
  
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
