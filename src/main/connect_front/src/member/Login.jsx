import axios from 'axios';
import '../css/member.css';
import { useContext } from 'react';
import { LoginInfoContext } from '../index/Index';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';



export default function Login(props){

    const {loginInfo} = useContext(LoginInfoContext);

    const login = async()=>{

        const loginForm = document.querySelector('#loginForm');
        const loginFormData = new FormData(loginForm);

        await axios.post('/conn/m/login.do',loginFormData)
        .then((r)=>{
            if(r.data){
                alert('로그인성공');
                window.location.href = "/conn"
            }else{
                alert('로그인실패');
            }
        })
        .catch(error=>{console.log(error)})
    }

    return(<>
         <div id="container">
            <div id='totalBox'>
                <div id="loginBox">
                    <div className='loginImg'>
                        <img src="/img/connect_logo.png"/>
                    </div>
                    <div className='loginForm'>
                        <form id='loginForm'>
                            <div>
                                <Input type="text" placeholder='아이디' name='mid' />
                            </div>
                            <div>
                                <Input style={{marginTop : 10}} type="password" placeholder='비밀번호' name='mpw'/>
                            </div>
                            <div>
                                <Button style={{backgroundColor : '#87C55B', padding : 10}} type="button" color='warning' className='logBtn' fullWidth onClick={login}>로그인</Button>
                            </div>
                            <div className='signUp'>
                                <Link to="/member/signup">회원가입</Link>
                            </div>
                        </form> 
                    </div>                   
                </div>
            </div>
         </div>
    </>)
}