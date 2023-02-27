const inputFormHandler = async (event) => {
    event.preventDefault();
    const body = document.querySelector('#newbody').value.trim(); 
    const post_id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
    if (body) {
      const response = await fetch(`/api/users/comment/${post_id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to delete the comment.');
        console.log(response.message);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', inputFormHandler);
  