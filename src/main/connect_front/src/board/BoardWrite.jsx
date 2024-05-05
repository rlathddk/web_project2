import { useContext, useState } from 'react';
import '../css/board.css'
import axios from 'axios';
import Carousel from "react-material-ui-carousel";
import { LoginInfoContext } from "../index/Index";


export default function BoardWrite(props){

    const [bcontent, setBcontent] = useState('');
    const [imgPre, setImgPre] = useState([]);
    const {loginInfo, setLoginInfo } = useContext(LoginInfoContext);
    const mnickname = loginInfo.mnickname

    const onChangeBcontent = (e)=>{
        setBcontent(e.target.value)

    }

    const onChangeImg = (e) =>{
        const imgArray = Array.from(e.target.files);
        let imgPre = [];
        imgArray.forEach((i) => {
            imgPre.push(URL.createObjectURL(i));
        });
        setImgPre(imgPre);
    }
    
    const onSubmit = (e)=>{
        const contentForm = document.querySelector(".innerContainer");
        const contentFormData = new FormData(contentForm);
        contentFormData.set("bcontent", bcontent)       

        

        axios.post("/conn/b/post.do", contentFormData)
        .then(response => {
            if(response.data == 1){
                alert('등록성공')
                window.location.href = '/board/sub/'+mnickname
            }else if(response.data == 0){
                alert('사진없음')
            }else if(response.data == 2){
                alert('등록실패')
            }
        })
        .catch(error => {console.log(error)})
    }
    return(<>
        <section id="container">
            <form className="innerContainer">
                <div className="header">
                    HEADER
                    <button type="button" onClick={onSubmit}>쓰기</button>
                </div>
                <div className="content mainContent">
                <Carousel autoPlay={false}>                
                {
                    imgPre.length!=0 &&
                    imgPre.map((i)=>{
                        return(<>
                            <img src={i} style={{width:"100%", height:400, objectFit:"cover"}}/>
                        </>)
                    })
                }
                                
                           
                </Carousel>
                </div>
                

                
                <div className="btmBox">
                    <input type="file" name="gfile" multiple onChange={(e)=>onChangeImg(e)}  accept='image/*' />
                </div>
                <div className="btmBox">
                    <textarea value={bcontent} onChange={onChangeBcontent}></textarea>
                </div>
                <div className="footer">
                    FOOTER
                </div>
            </form>
        </section>
    </>)
}