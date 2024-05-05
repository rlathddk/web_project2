import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginInfoContext } from "../index/Index";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import '../css/member.css';

export default function Edit(props){

    const {setLoginInfo} = useContext(LoginInfoContext);
    const nav = useNavigate();

    // useParams, useEffect
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mnickname = searchParams.get('mnickname');

    useEffect(()=>{
        axios.get("/conn/m/page/get.do", {params:{mnickname:mnickname}})
        .then(response =>{
            setMember(response.data);
        })
        .catch(error=>{console.log(error);})
    },[])

    // 수정 Ref
    const editMember = useRef(null);

    // 버튼 State
    const [disabled, setDisabled] = useState(false);

    // 초기값 State
    const [member, setMember] = useState({
        mname : '',
        mnickname : '',
        memail : '',
        mphone : '',
        mimg : ''
    });

    // 메시지 State
    const [msgName, setMsgName] = useState('');
    const [msgNickName, setMsgNickName] = useState('');
    const [msgEmail, setMsgEmail] = useState('');
    const [msgPhoneNumber, setMsgPhoneNumber] = useState('');

    // 유효성검사 결과 State
    const [checkName, setCheckName] = useState(true);
    const [checkNickName, setCheckNickName] = useState(true);
    const [checkEmail, setCheckEmail] = useState(true);
    const [checkPhoneNumber, setCheckPhoneNumber] = useState(true);

    // 정규표현식
    let nameRule = /^[가-힣a-zA-Z]{3,19}$/;
    let nickNameRule = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{5,20}$/;
    let emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    let phoneNumberRule = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

    const onChangeNameCheck = async (e)=>{
        member.mname = e.target.value;
        setMember({...member});
        if(nameRule.test(member.mname)){
            setMsgName('사용가능한 이름입니다.')
            setCheckName(true);
        }else{
            setMsgName('한글 또는 영문 3~20자를 입력해주세요.')
            setCheckName(false);
        }
    }
    const onChangeFindNickNameCheck = async (e)=>{
        member.mnickname = e.target.value;
        setMember({...member});
        if(nickNameRule.test(member.mnickname)){
            await axios.get("/conn/m/check.nickname",{params:{'nickName':member.mnickname}})
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
        member.memail = e.target.value;
        setMember({...member});
        if(emailRule.test(member.memail)){
            await axios.get("/conn/m/check.email",{params:{'email':member.memail}})
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
        member.mphone = e.target.value;
        setMember({...member});
        if(phoneNumberRule.test(member.mphone)){
            await axios.get("/conn/m/check.phonenumber",{params:{'phoneNumber':member.mphone}})
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

    let checkArray = [checkName, checkNickName, checkEmail, checkPhoneNumber]

    const [img, setImg] = useState("");

    const onChangeProfile  = (e)=>{
        const file = e.target.files[0];
        const imgFile = new FileReader();
        imgFile.readAsDataURL(file);
        imgFile.onloadend = ()=>{
            setImg(imgFile.result)
        }
    }

    const onEditMember = async()=>{
        for(let i=0; i<checkArray.length; i++){
            if(!checkArray[i]){
                setDisabled(false);
                return
            }else{
                setDisabled(true);
            }
        }
        await axios.put("/conn/m/put.do", editMember.current)
        .then(response=>{
            setLoginInfo(response.data);
            nav("/board/sub?mnickname="+response.data.mnickname)
        })
        .catch(error=>{console.log(error);})
    }

    return(
        <div className="myInfo">
            <div className="myInfoEdit">
                <div className='imgBox'>
                <img src={member.mimg != 'default.png' ? "/img/mimg/"+member.mimg : "/img/mimg/default.png"} alt="" />
                </div>
                <div className="content">
                    <form ref={editMember}>
                        <Input name="mfile" type="file" accept="img/*" onChange={onChangeProfile}/>
                        <Input type="text" name="mname" value={member.mname} onChange={onChangeNameCheck}/>
                        <p>{member.mname !== ''? msgName:''}</p>
                        <Input type="text" name="mnickname" value={member.mnickname} onChange={onChangeFindNickNameCheck}/>
                        <p>{member.mnickname !==''?msgNickName:''}</p>
                        <Input type="text" name="memail" value={member.memail} onChange={onChangeFindEmailCheck}/>
                        <p>{member.memail!==''?msgEmail:''}</p>
                        <Input type="text" name="mphone" value={member.mphone} onChange={onChangeFindPhoneNumberCheck}/>
                        <p>{member.mphone!==''?msgPhoneNumber:''}</p>
                    </form>
                    <div className="editBtn">
                        <Link to="/member/delete"><Button type="button" onClick={onEditMember}>회원탈퇴하기</Button></Link>
                        <Button type="button" onClick={onEditMember}>수정</Button>
                    </div>
                </div>  
            </div>
        </div>
    )
}