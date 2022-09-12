const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);

// function to check if user is in dashboard page, if so change title to "Your Dashboard"
function dashboardCheck() {
    const urlArray = window.location.toString().split('/')
    if (urlArray.includes('dashboard')) {
        document.querySelector('.nav-heading').innerHTML = "Your Dashboard";
    } else {
        return
    }
}

dashboardCheck()