const addComment = async (event) => {
    event.preventDefault();
    document.location.href=`/addcomment/${document.URL.substring(document.URL.lastIndexOf('/') + 1)}`;
};
// listener for the click of the button
document.querySelector('#comment_post').addEventListener('click', addComment);
