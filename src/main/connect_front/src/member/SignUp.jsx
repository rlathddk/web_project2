import React, { useRef, useState } from 'react';
import axios from 'axios';
import Input from '@mui/joy/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/joy/Button';
import '../css/member.css';
import { Link } from 'react-router-dom';

export default function SignUp(props){

    const signup = useRef(null);

    // 초기값 State
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    // 메시지 State
    const [msgName, setMsgName] = useState('');
    const [msgId, setMsgId] = useState('');
    const [msgPassword, setMsgPassword] = useState('');
    const [msgPasswordConfirm, setMsgPasswordConfirm] = useState('');
    const [msgNickName, setMsgNickName] = useState('');
    const [msgEmail, setMsgEmail] = useState('');
    const [msgPhoneNumber, setMsgPhoneNumber] = useState('');

    // 유효성검사 결과 State
    const [checkName, setCheckName] = useState(false);
    const [checkId, setCheckId] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkPasswordConfirm, setCheckPasswordConfirm] = useState(false);
    const [checkNickName, setCheckNickName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
    const [checkYear, setCheckYear] = useState(false);
    const [checkMonth, setCheckMonth] = useState(false);
    const [checkDay, setCheckDay] = useState(false);

    // 정규표현식
    let nameRule = /^[가-힣a-zA-Z]{3,19}$/;
    let idRule = /^[a-z]+[a-z0-9]{5,19}$/;
    let passwordRule = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    let nickNameRule = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,20}$/;
    let emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    let phoneNumberRule = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

    const onChangeNameCheck = async (e)=>{
        const inputName = e.target.value;
        setName(inputName);
        if(nameRule.test(inputName)){
            setMsgName('사용가능한 이름입니다.')
            setCheckName(true);
        }else{
            setMsgName('한글 또는 영문 3~20자를 입력해주세요.')
            setCheckName(false);
        }
    }

    const onChangeIdCheck = async (e)=>{
        const inputId = e.target.value;
        setId(inputId);
        if(idRule.test(inputId)){
            await axios.get("/conn/m/check.id",{params:{'mid':inputId}})
            .then(response =>{
                if(response.data){
                    setMsgId('중복된 아이디입니다.');
                    setCheckId(false);
                }else{
                    setMsgId('사용가능한 아이디입니다.')
                    setCheckId(true);
                }
            })
            .catch(error=>{console.log(error);})
        }else{
            setMsgId('영문자 또는 숫자 6~20자를 입력해주세요.');
            setCheckId(false);
        }
    }

    const onChangePasswordcheck = async (e)=>{
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        if(passwordRule.test(inputPassword)){
            setMsgPassword('사용가능한 비밀번호입니다.');
            setCheckPassword(true);
        }else{
            setMsgPassword('8~16자 영문, 숫자 조합으로 입력해주세요.');
            setCheckPassword(false);
        }
    }

    const onChangePasswordConfirm = async (e)=>{
        const inputPasswordConfirm = e.target.value;
        setPasswordConfirm(inputPasswordConfirm);
        if(password === inputPasswordConfirm){
            setMsgPasswordConfirm('비밀번호가 일치합니다.')
            setCheckPasswordConfirm(true);
        }else{
            setMsgPasswordConfirm('비밀번호가 일치하지 않습니다.')
            setCheckPasswordConfirm(false);
        }
    }

    const onChangeFindNickNameCheck = async (e)=>{
        const inputNickName = e.target.value;
        setNickName(inputNickName);
        if(nickNameRule.test(inputNickName)){
            await axios.get("/conn/m/check.nickname",{params:{'nickName':inputNickName}})
            .then(response =>{
                if(response.data){
                    setMsgNickName('중복된 닉네임입니다.');
                    setCheckNickName(false);
                }else{
                    setMsgNickName('사용가능한 닉네임입니다.');
                    setCheckNickName(true);
                }
            })
            .catch(error=>{console.log(error);})
        }else{
            setMsgNickName('5~20자를 입력해주세요.')
            setCheckNickName(false);
        }
    }

    const onChangeFindEmailCheck = async (e)=>{
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        if(emailRule.test(inputEmail)){
            await axios.get("/conn/m/check.email",{params:{'email':inputEmail}})
            .then(response =>{
                if(response.data){
                    setMsgEmail('중복된 이메일입니다.');
                    setCheckEmail(false);
                }else{
                    setMsgEmail('사용가능한 이메일입니다.')
                    setCheckEmail(true);
                }
            })
            .catch(error=>{console.log(error);})
        }else{
            setMsgEmail('이메일의 형식이 올바르지 않습니다.');
            setCheckEmail(false);
        }
    }

    const onChangeFindPhoneNumberCheck = async (e)=>{
        const inputPhoneNumber = e.target.value;
        setPhoneNumber(inputPhoneNumber);
        if(phoneNumberRule.test(inputPhoneNumber)){
            await axios.get("/conn/m/check.phonenumber",{params:{'phoneNumber':inputPhoneNumber}})
            .then(response =>{
                if(response.data){
                    setMsgPhoneNumber('중복된 전화번호입니다.');
                    setCheckPhoneNumber(false);
                }else{
                    setMsgPhoneNumber('올바른 전화번호입니다.');
                    setCheckPhoneNumber(true);
                }
            })
            .catch(error=>{console.log(error);})
        }else{
            setMsgPhoneNumber('전화번호 형식이 올바르지 않습니다.');
            setCheckPhoneNumber(false);
        }
    }

    const now = new Date();
    let years = ["출생연도"];
    for(let y=now.getFullYear()-100; y<=now.getFullYear(); y++){
        years.push(y.toString());
    }
    let months = ["월"];
    for(let m=1; m<=12; m++){
        if(m<10){
            months.push("0"+m.toString());
        }else{
            months.push(m);
        }
    }
    let days = ["일"];
    let date = new Date(year, month, 0).getDate();
    for(let d=1; d<=date; d++){
        if(d<10){
            days.push("0"+d.toString());
        }else{
            days.push(d.toString());
        }
    }

    const onChangeYear = (e)=>{
        setYear(e.target.value);
        setCheckYear(true);
        if(year==='출생연도'){
            setCheckYear(false);
        }else{
            setCheckYear(true);
        }
    }
    const onChangeMonth = (e)=>{
        setMonth(e.target.value);
        setCheckMonth(true);
        if(month==='월'){
            setCheckMonth(false)
        }else{
            setCheckMonth(true);
        }
    }
    const onChangeDay = (e)=>{
        setDay(e.target.value);
        setCheckDay(true);
        if(day==='일'){
            setCheckDay(false)
        }else{
            setCheckDay(true);
        }
    }

    let checkArray = [checkName, checkId, checkPassword, checkPasswordConfirm, checkNickName, checkEmail, checkPhoneNumber, checkYear, checkMonth, checkDay]

    const onSignup = (e)=>{
        for(let i=0; i<checkArray.length; i++){
            if(!checkArray[i]){
                return
            }
        }
        axios.post('/conn/m/signup.do',signup.current)
            .then(response=>{
                window.location.href="/"
            })
            .catch(error=>{console.log(error);})
    }

    return(<>
        <section id="container">
            <div className="innerContainer">
                <div className="content">
                    <div className='loginForm'>
                        <Link to="/conn"><img src="/img/connect_logo.png" style={{width:200, marginLeft:75}} /></Link>
                        <form ref={signup}>
                            <Input type="text" name="mname" placeholder='이름을 입력해주세요' value={name} onChange={onChangeNameCheck} />
                            <p>{name!==''? msgName:''}</p>
                            <Input type="text" name="mid" placeholder="아이디를 입력해주세요" value={id} onChange={onChangeIdCheck}/>
                            <p>{id!==''?msgId:''}</p>
                            <Input type="password" name="mpw" placeholder='비밀번호를 입력해주세요' value={password} onChange={onChangePasswordcheck}/>
                            <p>{password!==''? msgPassword:''}</p>
                            <Input type="password" placeholder='비밀번호를 확인해주세요' value={passwordConfirm} onChange={onChangePasswordConfirm} disabled={passwordRule.test(password)?false:true}/>
                            <p>{passwordConfirm!==''? msgPasswordConfirm:''}</p>
                            <Input type="text" name="mnickname" placeholder="닉네임을 입력해주세요" value={nickName} onChange={onChangeFindNickNameCheck}/>
                            <p>{nickName!==''?msgNickName:''}</p>
                            <Input type="text" name="memail" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeFindEmailCheck}/>
                            <p>{email!==''?msgEmail:''}</p>
                            <Input type="text" name="mphone" placeholder="전화번호를 입력해주세요" value={phoneNumber} onChange={onChangeFindPhoneNumberCheck}/>
                            <p>{phoneNumber!==''?msgPhoneNumber:''}</p>
                            <FormControl sx={{ m: 1, minWidth: 120 , '& .MuiSelect-select:focus': { borderColor: 'green' }}} size="small">
                                <InputLabel id="demo-select-small-label">year</InputLabel>
                                <Select labelId="demo-select-small-label" id="demo-select-small" value={year} onChange={onChangeYear} autoWidth label="year">
                                    {years.map(year=>{
                                        return <MenuItem value={year} key={year}>{year}</MenuItem >
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">month</InputLabel>
                                <Select labelId="demo-select-small-label" id="demo-select-small" value={month} onChange={onChangeMonth} autoWidth label="month">
                                    {months.map(month=>{
                                        return <MenuItem value={month} key={month}>{month}</MenuItem >
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">day</InputLabel>
                                <Select labelId="demo-select-small-label" id="demo-select-small" value={day} onChange={onChangeDay} autoWidth label="day">
                                    {days.map(day=>{
                                        return <MenuItem value={day} key={day}>{day}</MenuItem >
                                    })}
                                </Select>
                            </FormControl>
                            <input name="mbirth" style={{display:'none'}} type='text' value={year+month+day} readOnly/>
                        </form>
                        <Button type="button" style={{backgroundColor:'#87C55B'}} onClick={onSignup} fullWidth>Signup</Button>
                    </div>
                </div>
            </div>
        </section>
    </>);
   
}