const inputFormHandler = async (event) => {
    event.preventDefault();
    const date = new Date(); // get the current date
    const name = document.querySelector('#newname').value.trim(); 
    const body = document.querySelector('#newbody').value.trim(); 
    const post_id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
    if (body && name) {
      const response = await fetch(`/api/users/post/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, body, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to update the post.');
        console.log(response.message);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', inputFormHandler);
  