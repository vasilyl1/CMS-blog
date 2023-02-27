const inputFormHandler = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#newcomment').value.trim();
    const date = new Date(); // get the current date
    // id of the post getting via URL
    const post_id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
  
    if (body) {
      const response = await fetch(`/api/users/comment/${post_id}`, {
        method: 'POST',
        body: JSON.stringify({ body, date, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        alert('Failed to update.');
        console.log(response.message);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', inputFormHandler);
  