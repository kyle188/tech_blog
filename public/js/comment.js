const commentFormHandler = async (event) => {
    event.preventDefault()

    const commentId = event.target.dataset.id
   const comment = event.target.querySelector('.commentInput').value


    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ 
                post_id: commentId, 
                content: comment }),
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
}

const commentForms = Array.from(document.querySelectorAll('.commentForm'))
commentForms.forEach(form =>{
    form.addEventListener('submit', commentFormHandler)
})
