import React from 'react';
import {format, formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';

function Post({_id, title, summary, cover, content, createdAt, author}) {
    return (
        <Link to={`/post/${_id}`}>
        <div className='sm:flex sm:w-4/5 mx-auto gap-2 m-2 p-2 border border-gray-200 mb-6 hover:bg-gray-50 hover:cursor-pointer'>
            <div className='m-auto sm:w-[50%] max-h-full'><img src={'http://localhost:4000/'+cover} /></div>
            <div className='sm:w-[50%] p-2'>
                <h2 className='font-bold text-base'>{title}</h2>
                <a className='text-xs font-bold pr-4'>{author.username}</a> <time className='text-xs'>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                <p className='text-sm mt-2'>{summary}</p>
            </div>
        </div>
        </Link>
    )
}

export default Post