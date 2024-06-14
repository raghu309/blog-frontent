import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
  
    useEffect(() => {
        fetch('http://localhost:4000/post/'+id)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    }, [])
    
    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files !== null) {
            data.set('file', files[0]);
        }

        const response = await fetch(`http://localhost:4000/post`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if(response.ok) {
            setRedirect(true);
        }
        
    }
    if (redirect) {
      return <Navigate to={'/post/'+id} />
    }
  
    return (
      <form onSubmit={updatePost} className='flex flex-col text-center m-auto max-w-[600px]'>
        <input onChange={ev => setTitle(ev.target.value)} type='title' value={title} placeholder='Title' />
        <input onChange={ev => setSummary(ev.target.value)} type='title' value={summary} placeholder='Summary' />
        <input onChange={ev => setFiles(ev.target.files)} type='file' />
        <ReactQuill onChange={newVal => setContent(newVal)} value={content} placeholder='Write the Content Here' />
        <button className='w-full bg-gray-700 rounded-md text-white p-2'>Edit Post</button>
      </form>
    )
}

export default EditPost