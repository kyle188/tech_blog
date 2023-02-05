const postFormHandler = async (event) => {
    event.preventDefault()
    const title = document.getElementById('titleInput').value.trim()
    const description = document.getElementById('descriptionInput').value.trim()
    if (title && description) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ 
                title, 
                description}),
                headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            document.location.replace('/posts')
        } else {
            alert(response.statusText)
        }
    }
    else{
        alert("Title and Description required for post")
    }
}



const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/posts');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .getElementById('newPostForm')
    .addEventListener('submit', postFormHandler);

document
    .getElementById('postList')
    .addEventListener('click', delButtonHandler);




















