import React, { useState } from 'react'
import './SignUpStyle.css'
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

      window.localStorage.setItem("labeddit", response.data.token)
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
      
        <div className='logoAndButton'>
          <div className='logos'>
            <img className='logo' src={Logo} alt="" />
            <img className='logo1' src={Logo1} alt="" />
            <img className='logo2' src={Logo2} alt="" />
            <img className='logo3' src={Logo3} alt="" />
          </div>
          <div>
            <button>Entrar</button>
          </div>
        </div>
        <h2>Olá, boas vindas ao LabEddit ;)</h2>
        <div className='inputsAndButton'>
            <form onSubmit={handleClick}>
          <div className='inputs'>
          
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
           </form>
        </div>
      
    </div>
  )
}

export default SignUpPage