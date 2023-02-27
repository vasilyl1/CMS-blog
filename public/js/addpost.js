const addPost = async (event) => {
    event.preventDefault();
    document.location.href=`/addpost`;
};
// listener for the click of the button
document.querySelector('#add_post').addEventListener('click', addPost);
