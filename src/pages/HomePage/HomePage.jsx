import React, { useEffect, useState } from 'react'
import "./HomeStyle.css"
import Logo from "../../assets/icons/Vector.png"
import Logo1 from "../../assets/icons/Vector1.png"
import Logo2 from "../../assets/icons/Vector2.png"
import Logo3 from "../../assets/icons/Vector3.png"
import Like from "../../assets/icons/like.png"
import Dislike from "../../assets/icons/dislike.png"
import Comment from "../../assets/icons/comment.png"
import { useNavigate } from 'react-router-dom'
import { goToCommentsPage, goToLoginPage } from '../../router/coordinator'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'

const HomePage = () => {
  const token = window.localStorage.getItem("labeddit-token")

  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [inputPost, setInputPost] = useState([])

  const onChangeInputPost = (event) => {
    setInputPost(event.target.value)
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
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.get(`${BASE_URL}/posts`, config)
      setPosts(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const postInput = async () => {
    try {
      const body = {
        "content": inputPost
      }

      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.post(`${BASE_URL}/posts/`, body, config)
      setInputPost(response)
      fetchPosts()
      setInputPost("")
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
      fetchPosts()
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
      <form onSubmit={handleClick}>
        <div className='divInput'>
          <input
            className='postInput'
            placeholder='Escreva seu texto'
            type="text"
            value={inputPost}
            onChange={onChangeInputPost}
          ></input>
        </div>
        <div className='buttons'>
          <button onClick={postInput} className='button' >Postar</button>
          <hr className='line'></hr>
        </div>
      </form>
      <div className='postsContainer'>
        {posts && posts.map((post) => {
          return <div key={post.id} className='posts'>
            <span>Enviado por: {post.creator.nickName}</span>
            <p>{post.content}</p>
            <div className='icons'>
              <img onClick={() => inputlikeOrDislikePost(post.id, true)} className='like' src={Like} alt="" />
              <span>{post.likes}</span>
              <img onClick={() => inputlikeOrDislikePost(post.id, false)} className='dislike' src={Dislike} alt="" />
              <img onClick={() => goToCommentsPage(navigate, post.id)} className='comment' src={Comment} alt="" />
              <span>{post.comments}</span>
            </div>
          </div>
        })}
        <div>
        </div>
      </div>
    </div>
  )
}

export default HomePage