import * as React from 'react';
import axios from "axios";
import { useContext, useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInfoContext } from "../index/Index";
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/joy/Button';

export default function Header(props){

    const {loginInfo, setLoginInfo } = useContext(LoginInfoContext);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/conn/m/login/info/get.do")
        .then(response=>{
            setLoginInfo(response.data)
        })
        .catch(error=>{console.log(error)})
    },[])

    if(window.location.pathname === "/"){
        return null;
    }
    if(window.location.pathname === "/member/signup"){
        return null;
    }

    const onSearch = ()=>{
        navigate(`/member?search=${searchValue}`);
    }

    return(<>
        <div className="header">
            <div className="headerImg">
                <Link to="/conn"><img src="/img/connect_logo.png"/></Link>
            </div>
            <div>
                <Input 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} 
                    startDecorator={<SearchIcon style={{color : '#87C55B'}} />} 
                    endDecorator={<Button onClick={onSearch} style={{backgroundColor : '#87C55B'}}>Search</Button>}
                />
            </div>
            <div>
                <div className="headerProfile">
                    <div> 
                        <Link to='/chat'>
                            <SendIcon style={{color : '#FAA331', marginTop: 5}}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>)
}