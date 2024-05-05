import axios from "axios";
import { useState } from "react"

export default function Delete(props){

    const [mpw, setMpw] = useState('');

    const onChangeMpw = (e)=>{
        setMpw(e.target.value);
    }

    const onDelete = async()=>{
        await axios.get("/conn/m/check.password",{params:{mpw:mpw}})
        .then(response=>{
            if(response.data){
                axios.delete("/conn/m/delete.do")
                .then(response=>{
                    alert('탈퇴 성공 이용해주셔서 감사합니다. GOOD BYE')
                    window.location.href="/member/login"
                })
                .catch(error=>{console.log(error);})
            }else{
                alert('비밀번호가 일치하지 않습니다.')
            }
        })
    }

    return(<>
        <input type="text" placeholder="비밀번호를 입력해주세요" value={mpw} onChange={onChangeMpw}/>
        <button type="button" onClick={onDelete}>삭제하기</button>
    </>)
}