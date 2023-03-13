import React, { useState } from 'react'
import './Style.css'
import Logo from "../../assets/icons/Vector.png"
import Logo1 from "../../assets/icons/Vector1.png"
import Logo2 from "../../assets/icons/Vector2.png"
import Logo3 from "../../assets/icons/Vector3.png"
import axios from 'axios'
import { BASE_URL } from '../../constants/url'
import { goToHomePage } from '../../router/coordinator'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleClick = (event) => {
    event.preventDefault()
    console.log(form);
  }

  const login = async () => {
    try {
      setIsLoading(true)

      const body = {
        email: form.email,
        password: form.password
      }

      const response = await axios.post(
        `${BASE_URL}/users/login`,
        body
      )

      window.localStorage.setItem("labeddit-token", response.data.token)
      window.alert("Usuário logado com sucesso")
      setIsLoading(false)
      console.log(response.data.token);
      goToHomePage(navigate)

    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  return (
    <div className='loginContainer'>
      <div className='logoContainer'>
        <div className='logos'>
          <img className='logo' src={Logo} alt="" />
          <img className='logo1' src={Logo1} alt="" />
          <img className='logo2' src={Logo2} alt="" />
          <img className='logo3' src={Logo3} alt="" />
        </div>
        <h1>LabEddit</h1>
        <p>Projeto desenvolvido por Lucas Marques</p>

        <div className='inputs'>
          <form onSubmit={handleClick}>
          <input
           className='input'
            placeholder='E-mail'
            name="email"
            value={form.email}
            onChange={onChangeForm}
            ></input>
          <input
           className='input'
            placeholder='Password'
            name="password"
            value={form.password}
            onChange={onChangeForm}
            ></input>
            </form>
        </div>
        <div className='buttons'>
          <button className='button' onClick={login}>Continuar</button>
          <hr className='line'></hr>
          <button className='button'>Crie uma conta</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage