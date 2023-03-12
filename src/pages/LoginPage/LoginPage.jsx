import React from 'react'
import './Style.css'
import Logo from "../../assets/icons/Vector.png"
import Logo1 from "../../assets/icons/Vector1.png"
import Logo2 from "../../assets/icons/Vector2.png"
import Logo3 from "../../assets/icons/Vector3.png"

const LoginPage = () => {
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
        <input className='input' placeholder='E-mail'></input>
        <input className='input' placeholder='Password'></input>
      </div>
      <div className='buttons'>
      <button className='button'>Continuar</button>
      <hr className='line'></hr>
      <button className='button'>Crie uma conta</button>
      </div>
      </div>
    </div>
  )
}

export default LoginPage