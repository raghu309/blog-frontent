import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../UserContext';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

function PostPage() {
	const { userInfo } = useContext(UserContext);
	const { id } = useParams();
	const [postInfo, setPostInfo] = useState(null);
	useEffect(() => {
		fetch(`http://localhost:4000/post/${id}`)
			.then(response => {
				response.json().then(postInfo => {
					setPostInfo(postInfo);
					console.log(postInfo);
					console.log(userInfo);
				})
			})
	}, [])

	if (!postInfo) return (<div className='w-full m-auto text-center'>Post Not Found</div>)
	return (
		<div className='p-8 sm:max-w-[800px] m-auto mt-7 border border-gray-200 rounded-3xl'>
			<h1 className='font-bold text-2xl mb-4'>{postInfo.title}</h1>
			<div className='max-w-[100%] max-h-full'><img className='rounded-md' src={'http://localhost:4000/' + postInfo.cover} /></div>
			<div className='mt-4 flex flex-row justify-between'>
				<div>
				<div className='text-xs'>{formatISO9075(new Date(postInfo.createdAt))}</div>
				<div className='text-sm'>by @{postInfo.author.username}</div>
				</div>
				<div>
					{(userInfo===postInfo.author.username) && <Link className='text-white bg-gray-700 py-2 px-4 rounded-lg' to={`/edit/${id}`}>EditPost</Link>}
				</div>
			</div>

			<div className='mt-8' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
		</div>
	)
}

export default PostPage