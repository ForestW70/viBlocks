const loginFormHandler = async (event) => {
  event.preventDefault();

  // Gather the data from the form elements on the page
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send the e-mail and password to the server
    // api route
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/user-dash');
    } else {
      alert('Failed to log in');
    }
  }
};

const createUser = async() => {
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordConfirm = document.querySelector('#confirm-password').value.trim();

  if (password === passwordConfirm) {
    const response = await fetch('/api/users/add', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }, 
    });

    if (response.ok) {
      document.location.replace('/user-dash')
    }
  }

  
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
