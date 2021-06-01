const createUser = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username-signup').value.trim().toLowerCase();
  const password = document.querySelector('#password-signup').value;
  const passwordConfirm = document.querySelector('#confirm-password').value;

  if (password === passwordConfirm) {
    const res = await fetch('/api/users/' + username);
    if(res.status === 404){
      const response = await fetch('/api/users/add', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/user-dash');
      }else {
        alert('Failed to sign up! Make sure password has 8 or more characters!');
      }
    }else if(res.ok){
      alert('Username is already taken!');
      return;
    } else{
      alert('Failed to sign up! Make sure password has 8 or more characters!');
    }
  }else{
    alert('Passwords do not match!');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('sign-up-form').addEventListener('submit', createUser);
});