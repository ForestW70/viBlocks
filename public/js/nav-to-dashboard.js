const goToDash = async () => {
    const response = await fetch('/users-dash', {
        method: 'GET',
        headers: {},
    });

    if (response.ok) {
        document.location.replace('/users-dash');
    } else {
        alert(response.statusText);
    }
};

document.getElementById('goToDash').addEventListener('click', goToDash);
