import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
    <div>Welcome</div>
    {/* <Link to='/home'>Go to home</Link> */}
    <Link to='/create-a-pet'>Create a Pet</Link>
    </>

  )
}

export default Welcome