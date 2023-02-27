const inputFormHandler = async (event) => {
    event.preventDefault();
    const date = new Date(); // get the current date
    const name = document.querySelector('#newname').value.trim(); 
    const body = document.querySelector('#newbody').value.trim(); 
    if (body && name) {
      const response = await fetch(`/api/users/post`, {
        method: 'POST',
        body: JSON.stringify({ name, body, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to create new post.');
        console.log(response.message);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', inputFormHandler);
  