import React, { useState } from 'react'

function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function register(ev) {
		ev.preventDefault();
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' }
		})

		if (response.status === 200) {
			alert('Registration Successful.');
		} else {
			alert('Registration Failed');
		}
	}

	return (
		<form onSubmit={register} className='border border-gray-300 rounded-xl max-w-[400px] p-3 gap-3 flex flex-col text-center m-auto mt-16'>
			<h2 className='font-bold text-2xl'>Register</h2>
			<input onChange={ev => setUsername(ev.target.value)} value={username} className='border border-gray-300 p-2 rounded-lg' placeholder='username' type='username' />
			<input onChange={ev => setPassword(ev.target.value)} value={password} className='border border-gray-300 p-2 rounded-lg' placeholder='password' type='password' />
			<button className='w-full bg-gray-700 rounded-md text-white p-2'>Register</button>
		</form>
	)
}

export default RegisterPage