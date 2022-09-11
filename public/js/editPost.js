// function to handle edit post
const editPostFormHandler = async (event) => {
    event.preventDefault();

    // collect values from the edit post form
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const path = `/api/posts/${postId}`
    
    if (title && content) {
        const response = await fetch(path, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post');
        }
    }
};

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostFormHandler);

// function to handle delete post
const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const path = `/api/posts/${postId}`

    const response = await fetch(path, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

document
    .querySelector('#delete-btn')
    .addEventListener('click', deletePostFormHandler);