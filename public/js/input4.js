const inputFormHandler = async (event) => {
    event.preventDefault();
    const date = new Date(); // get the current date
    const body = document.querySelector('#newbody').value.trim(); 
    const post_id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
    if (body) {
      const response = await fetch(`/api/users/comment/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ body, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to update the comment.');
        console.log(response.message);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', inputFormHandler);
  