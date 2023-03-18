import React, { useEffect, useState } from 'react'
import './CommentStyle.css'
import Logo from "../../assets/icons/Vector.png"
import Logo1 from "../../assets/icons/Vector1.png"
import Logo2 from "../../assets/icons/Vector2.png"
import Logo3 from "../../assets/icons/Vector3.png"
import Like from "../../assets/icons/like.png"
import Dislike from "../../assets/icons/dislike.png"
import Comment from "../../assets/icons/comment.png"
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'
import { goToLoginPage } from '../../router/coordinator'

const CommentsPage = () => {
  const token = window.localStorage.getItem("labeddit-token")

  const navigate = useNavigate()
  const params = useParams()

  const [inputComment, setInputComment] = useState()
  const [post, setPost] = useState([])

  const onChangeInputComments = (event) => {
    setInputComment(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (!token) {
      goToLoginPage(navigate)
    }
  }, [])

  useEffect(() => {
    fetchPostWithComments()
  }, [])

  const logout = () => {
    Auth: logout()
    return redirect("/login")
  }

  const fetchPostWithComments = async () => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }

      const response = await axios.get(`${BASE_URL}/posts/comments/${params.commentId}`, config)
      setPost(response.data.Post)
    } catch (error) {
      console.log(error);
    }
  }

  const commentInput = async () => {
    try {
      const body = {
        "comments": inputComment
      }

      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.post(`${BASE_URL}/comment/${params.commentId}`, body, config)
      setInputComment(response)
      fetchPostWithComments()
      setInputComment("")
    } catch (error) {
      console.log(error);
    }
  }

  const inputlikeOrDislikePost = async (id, like) => {
    try {
      const body = {
        "like": like
      }
      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.put(`${BASE_URL}/posts/${id}/like`, body, config)
      fetchPostWithComments()
    } catch (error) {
      console.log(error);
    }
  }

  const inputlikeOrDislikeComment = async (id, like) => {
    try {
      const body = {
        "like": like
      }
      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.put(`${BASE_URL}/comment/${id}/like`, body, config)
      fetchPostWithComments()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login-Container'>
      <div className='logoAndButton'>
        <div className='logos'>
          <img className='logo' src={Logo} alt="" />
          <img className='logo1' src={Logo1} alt="" />
          <img className='logo2' src={Logo2} alt="" />
          <img className='logo3' src={Logo3} alt="" />
        </div>
        <div className='enter'>
          <button onClick={() => {
            goToLoginPage(navigate)
            localStorage.removeItem("labeddit-token")
          }}>Logout</button>
        </div>
      </div>
      <div className='postContainer'>
        {post && post.map((item) => {
          return <div className='posts'>
            <span key={item.id}>Enviado por: {item.creator.nickName}</span>
            <p>{item.content}</p>
            <div className='icons'>
              <img onClick={() => inputlikeOrDislikePost(item.id, true)} className='like' src={Like} alt="" />
              <span>{item.likes}</span>
              <img onClick={() => inputlikeOrDislikePost(item.id, false)} className='dislike' src={Dislike} alt="" />
              <img className='comment' src={Comment} alt="" />
              <span>{item.comments}</span>
            </div>
          </div>
        })}
      </div>
      <div className='divInput'>
        <form onSubmit={handleClick}>
          <input
            className='commentInput'
            placeholder='Escreva seu texto'
            type="text"
            value={inputComment}
            onChange={onChangeInputComments}
          ></input>
        </form>
      </div>
      <div className='buttons'>
        <button onClick={commentInput} className='button'>Comentar</button>
        <hr className='line'></hr>
      </div>
      <div className='commentsContainer'>
        {post && post.map((item) => {
          return <div key={item.id} >
            {item.cmt.map((comment) => {
              return <div key={comment.id} className='comments'>
                <span key={comment.id}>Enviado por: {comment.creator_nickName}</span>
                <p>{comment.comments}</p>
                <div className='icons'>
                  <img onClick={() => inputlikeOrDislikeComment(comment.id, true)} className='like' src={Like} alt="" />
                  <span>{comment.likes}</span>
                  <img onClick={() => inputlikeOrDislikeComment(comment.id, false)} className='dislike' src={Dislike} alt="" />
                  <img className='comment' src={Comment} alt="" />
                </div>
              </div>
            })}
          </div>
        })}
      </div>
    </div>
  )
}

export default CommentsPage