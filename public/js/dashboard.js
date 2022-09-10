// const newPostFormHandler = async (event) => {
//     event.preventDefault();

//     // collect values from the create post form
//     const title = document.querySelector('#post-title').value.trim();
//     const content = document.querySelector('#post-content').value.trim();

//     if (title && content) {
//         const response = await fetch('/api/posts', {
//             method: 'POST',
//             body: JSON.stringify({ title, content }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.replace('/dashboard');
//         } else {
//             alert('Failed to create post');
//         }
//     }
// };

// document
//     .querySelector('.new-post-form')
//     .addEventListener('submit', newPostFormHandler);

// event listenter to unhide create new post form and hide existing post
const newPostBtn = document.querySelector('.new-post-btn');
const userPost = document.querySelector('.all-post');
const newPostForm = document.querySelector('.container')

// function to toggle hide of elements
function toggleHide(element) {
    element.classList.toggle('hidden');
}

newPostBtn.addEventListener('click', () => {
    toggleHide(newPostForm);
    toggleHide(userPost);
});