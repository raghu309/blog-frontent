import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost} className='flex flex-col text-center m-auto max-w-[600px]'>
      <input onChange={ev => setTitle(ev.target.value)} type='title' value={title} placeholder='Title' />
      <input onChange={ev => setSummary(ev.target.value)} type='title' value={summary} placeholder='Summary' />
      <input onChange={ev => setFiles(ev.target.files)} type='file' required />
      <ReactQuill onChange={newVal => setContent(newVal)} value={content} placeholder='Write the Content Here' />
      <button className='w-full bg-gray-700 rounded-md text-white p-2'>Create Post</button>
    </form>
  )
}

export default CreatePost