import React from 'react'
import { useParams } from 'react-router-dom'

const CommentsPage = () => {
  const params = useParams()

  return (
    <>
    <div>CommentsPage</div>
    {params.commentId}
    </>
  )
}

export default CommentsPage