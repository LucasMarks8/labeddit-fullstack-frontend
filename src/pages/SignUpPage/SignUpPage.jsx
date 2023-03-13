import React, { useState } from 'react'
import './Style.css'
import Logo from "../../assets/icons/Vector.png"
import Logo1 from "../../assets/icons/Vector1.png"
import Logo2 from "../../assets/icons/Vector2.png"
import Logo3 from "../../assets/icons/Vector3.png"
import axios from 'axios'
import { BASE_URL } from '../../constants/url'
import { goToLoginPage } from '../../router/coordinator'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    nickName: "",
    email: "",
    password: ""
  })

  const onChangeForm = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const handleClick = (event) => {
    event.preventDefault()
    console.log(form);
  }

  const signUp = async () => {
    try {
      setIsLoading(true)

      const body = {
        nickName: form.nickName,
        email: form.email,
        password: form.password
      }

      const response = await axios.post(
        `${BASE_URL}/users/signup`,
        body
      )

      window.localStorage.setItem("labeddit-token", response.data.token)
      window.alert("Cadastro realizado com sucesso")
      setIsLoading(false)
      console.log(response.data.token)
      goToLoginPage(navigate)
    
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  return (
    <div className='loginContainer'>
      <div className='logoContainer'>
        <div className='logoAndButton'>
          <div className='logos'>
            <img className='logo' src={Logo} alt="" />
            <img className='logo1' src={Logo1} alt="" />
            <img className='logo2' src={Logo2} alt="" />
            <img className='logo3' src={Logo3} alt="" />
          </div>
          <div className='enter'>
            <button>Entrar</button>
          </div>
        </div>
        <h1>Olá, boas vindas ao LabEddit ;)</h1>
        <div className='inputsAndButton'>
          <div className='inputs'>
            <form onSubmit={handleClick}>
            <input
              className='input'
              placeholder='NickName'
              name="nickName"
              type="nickName"
              value={form.nickName}
              onChange={onChangeForm}
            ></input>
            <input
              className='input'
              placeholder='E-mail'
              name="email"
              type="email"
              value={form.email}
              onChange={onChangeForm}
            ></input>
            <input
              className='input'
              placeholder='Password'
              name="password"
              type="password"
              value={form.password}
              onChange={onChangeForm}
            ></input>
            </form>
          </div>
          <div className='texts'>
            <p>Ao continuar, você concorda com o nosso <a href='#'>Contrato de usuário</a> e nossa <a href='#'>Política de privacidade</a></p>
            <div className='buttons'>
              <div>
                <input type="checkbox" />
                <label>Eu concordo em receber emails sobre coisas legais no Labeddit</label>
              </div>
            </div>
            <button className='button' onClick={signUp}>Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage