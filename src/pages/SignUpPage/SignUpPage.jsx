import React from 'react'
import './Style.css'
import Logo from "../../assets/icons/Vector.png"
import Logo1 from "../../assets/icons/Vector1.png"
import Logo2 from "../../assets/icons/Vector2.png"
import Logo3 from "../../assets/icons/Vector3.png"

const SignUpPage = () => {
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
          <input className='input' placeholder='NickName'></input>
          <input className='input' placeholder='E-mail'></input>
          <input className='input' placeholder='Password'></input>
        </div>
        <div className='texts'>
        <p>Ao continuar, você concorda com o nosso <a href='#'>Contrato de usuário</a> e nossa <a href='#'>Política de privacidade</a></p>
        <div className='buttons'>
        <div>
      <input type="checkbox" />
      <label>Eu concordo em receber emails sobre coisas legais no Labeddit</label>
    </div>
    </div>
          <button className='button'>Cadastrar</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage