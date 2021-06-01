const loginFormHandler = async (event) => {

  const response = await fetch('/app', {
    method: 'GET',

  });

  if (response.ok) {
    document.location.replace('/app');
  } else {
    alert('Failed');
  }
};


document.getElementById('test').addEventListener('click', loginFormHandler);
