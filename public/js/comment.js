const newCommentFormHandler = async (event) => {
    event.preventDefault();

    // collect values from the create comment form
    const comment_content = document.querySelector('#comment-content').value.trim();
    // collect postid from current window location (singl post)
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment_content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // console.log('testing comment fetch')

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentFormHandler);
