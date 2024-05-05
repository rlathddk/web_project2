import axios from "axios";
import { useState } from "react"

export default function BirthBoardWrite (props){

    const [bbcontent, setBbcontent] = useState('');
    
    const onChangeBbcontent = (e)=>{
        setBbcontent(e.target.value)
    }

    const submit =()=>{
        const birthForm = document.querySelector("#birthForm");
        const birthFormData = new FormData(birthForm);

        axios.post("/birthboard/post.do", birthFormData)
        .then(r =>{
            console.log(r);
            if(r){
                alert("게시글 등록 성공")
                window.location.href = '/birthboard/post'
            }else{
                alert("게시글 등록 실패")
            }
        })
        .catch(e=>{console.log(e)})
    }


    return(<>
        <section id="container">
            <form id="birthForm" className="innerContainer">
               <textarea value={bbcontent} onChange={onChangeBbcontent} name="bbcontent"></textarea>
               <div className="btmBox">
                    <input type="file" name="uploadList" multiple accept='image/*' />
                </div>
               <button type="button" onClick={submit}>등록</button>
            </form>
        </section>
    </>)
}