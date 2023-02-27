const editPost = async (event) => { // to edit post
    event.preventDefault();
    document.location.href=`/editpost/${document.URL.substring(document.URL.lastIndexOf('/') + 1)}`;
};
// listener for the click of the button
document.querySelector('#edit_post').addEventListener('click', editPost);

const deletePost = async (event) => { // to delete post
    event.preventDefault();
    document.location.href=`/deletepost/${document.URL.substring(document.URL.lastIndexOf('/') + 1)}`;
};
// listener for the click of the button
document.querySelector('#delete_post').addEventListener('click', deletePost);
