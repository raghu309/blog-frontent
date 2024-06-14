import React, { useEffect, useId, useState } from 'react';
import Post from '../Post';

function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post', {method: 'GET'}).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      }) 
    })
  }, []);

  return (
    <>
    {
      posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))
    }
    </>
  )
}

export default IndexPage