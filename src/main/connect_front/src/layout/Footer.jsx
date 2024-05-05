import * as React from 'react';
import axios from "axios";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { LoginInfoContext } from '../index/Index';


export default function Footer(props){
    const [value, setValue] = React.useState('recents');

    const {loginInfo, setLoginInfo} = React.useContext(LoginInfoContext)

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const onLogout = ()=>{
        axios.get('/conn/m/logout/get.do')
        .then(r=>{
            if(r.data){
                alert('로그아웃 성공');
                window.location.href = "/"
            }else{alert('로그아웃실패')}
        })
        setLoginInfo('');
    }

    if(window.location.pathname === "/"){
        return null;
    }
    if(window.location.pathname === "/member/signup"){
        return null;
    }


    return (
    <div className='footer'>
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            <Link to='/conn'>
                <BottomNavigationAction label="Home" value="recents" icon={<HomeIcon />}/>
            </Link>
            <Link to='/board/write'>
                <BottomNavigationAction label="Write" value="favorites" icon={<AddBoxIcon />}/>
            </Link>
            <Link to={"/board/sub?mnickname="+loginInfo.mnickname}>
                <BottomNavigationAction label="Profile" value="nearby" icon={<AccountBoxIcon />}/>
            </Link>
            <Link>
                <BottomNavigationAction label="Logout" value="folder" icon={<LogoutIcon />} onClick={onLogout} />
            </Link>
        </BottomNavigation>
    </div>
    );
}