import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Header() {
	const {setUserInfo, userInfo} = useContext(UserContext);
	useEffect(() => {
		fetch('http://localhost:4000/profile', {
			credentials: 'include'
		}).then((response) => {
			response.json().then((userInfo) => {
				setUserInfo(userInfo);
			})
		})
	}, []);

	function logout() {
		fetch('http://localhost:4000/logout',  {
			credentials: 'include',
			method: 'POST'
		});
		setUserInfo(null);
	}

	const username = userInfo?.username;

	return (
		<header className='flex mx-auto justify-between max-w-[600px] p-2 mb-2'>
			<Link className='font-bold' to={'/'}>MyBlog</Link>
			<nav className='flex gap-4'>
				{
					username && (
						<>
							<Link to='/create'>Create new post</Link>
							<Link to='/' className='inherit' onClick={logout}>Logout</Link>
						</>
					)
				}
				{
					!username && (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/register'>Register</Link></>
					)
				}

			</nav>
		</header>
	)
}

export default Header