import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function LoginPage() {
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        if(response.ok) {
          response.json().then(userInfo => {
            setUserInfo(userInfo.username);
            setRedirect(true);
          })
        }else {
            alert('Wrong Credentials.');
        }
    }

  if(redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={login} className='border border-gray-300 rounded-xl max-w-[400px] p-3 gap-3 flex flex-col text-center m-auto mt-16'>
      <h2 className='font-bold text-2xl'>Login</h2>
      <input onChange={ev => setUsername(ev.target.value)} value={username} className='border border-gray-300 p-2 rounded-lg' placeholder='username' type='username' />
      <input onChange={ev => setPassword(ev.target.value)} value={password} className='border border-gray-300 p-2 rounded-lg' placeholder='password' type='password' />
      <button className='w-full bg-gray-700 rounded-md text-white p-2'>Login</button>
    </form>
  )
}

export default LoginPage