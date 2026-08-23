import React from 'react'
import appwriteServices from '../appwrite/config.js'
import { Link } from 'react-router-dom'

function PostCard({$id, title,featureImage}) {
  return (
    //Link has closing tag also
   <Link to = {`/post/&{$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteServices.getFilePreview(featureImage)} alt={title} className='rounded-xl' />
        </div>
        <h2
        className='text-xl font-bold'>{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard