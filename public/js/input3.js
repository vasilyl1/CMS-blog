const inputFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#newname').value.trim(); 
    const body = document.querySelector('#newbody').value.trim(); 
    const post_id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
    if (body && name) {
      const response = await fetch(`/api/users/post/${post_id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to delete the post.');
        console.log(response.message);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', inputFormHandler);
  