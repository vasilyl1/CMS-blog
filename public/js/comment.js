const addComment = async () => {
    // form to get the comment content to be rendered here
    const body = "new comment body";
    const date = new Date();
    const response = await fetch(`/api/users/comment/${document.URL.substring(document.URL.lastIndexOf('/') + 1)}`, {
      method: 'POST',
      body: JSON.stringify({ body, date }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add the comment to the post.');
    }
  };
  
  document.querySelector('#comment_post').addEventListener('click', addComment);
  