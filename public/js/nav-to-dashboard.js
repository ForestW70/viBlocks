const goToDash = async () => {
  const response = await fetch('/user-dash', {
    method: 'GET',
    headers: {},
  });

  if (response.ok) {
    document.location.replace('/user-dash');
  } else {
    alert(response.statusText);
  }
};

document.getElementById('goBack').addEventListener('click', goToDash);
