const createUser = async () => {
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
            document.location.replace('/user-dash');
        } else {
            alert('Error!');
        }
    }
}

document.getElementById("createUserBtn").addEventListener('submit', createUser);