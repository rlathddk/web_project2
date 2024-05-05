import { useState } from 'react';

import '../css/board.css'
import axios from 'axios';
import Carousel from "react-material-ui-carousel";
import { useLocation, useNavigate } from 'react-router-dom';


export default function BoardUpdate(props){

    const nav = useNavigate();

    const location = useLocation();

    const [board, setBoard] = useState({
        bno : location.state.board.bno,
        bcontent : location.state.board.bcontent,
        gnameList : location.state.board.gnameList
    });

    const {bno, bcontent, gnameList} = board;

    const [imgPre, setImgPre] = useState({
        board : board.gnameList,
    });

    const onChangeBcontent = (e)=>{
        setBoard({bno:location.state.board.bno,bcontent:e.target.value})
    }

    const onChangeImg = (e) =>{
        const imgArray = Array.from(e.target.files);
        imgArray.forEach((i) => {
            imgPre.board.push(URL.createObjectURL(i));
        });
        setImgPre({...imgPre});
    }

    
    
    const onSubmit = (e)=>{
        const contentForm = document.querySelector(".innerContainer");
        const contentFormData = new FormData(contentForm);
        const bno = board.bno

        contentFormData.set("bno",board.bno)
        contentFormData.set("bcontent",board.bcontent)

        axios.put("/conn/b/put.do", contentFormData)
        .then(response => {
            if(response.data == 0){
                alert('수정성공')
                window.location.href = "/board/sub?mnickname="+location.state.board.mnickname
                //nav(-1)//뒤로가기
            }else if(response.data == 1){
                alert('사진없음')
            }else if(response.data == 2){
                alert('수정실패')
            }
        })
        .catch(error => {console.log(error)})
    }
    
    const imgDelete = (e, i)=>{
        axios.delete("/conn/b/imgdelete.do",{params:{gname:i}})
        .then(r=>{
            if(r.data){                
                board.gnameList.splice(board.gnameList.indexOf(i),1)
                setBoard({...board})                
            }else(
                alert("삭제실패")
            )
        })

    }


    return(<>
        <section id="container">
            <form className="innerContainer">
                <div className="header">
                    HEADER
                    <button type="button" onClick={onSubmit}>수정</button>
                </div>
                <div className="content mainContent">
                <Carousel autoPlay={false}>
                {imgPre.board.length!=0 &&
                    imgPre.board.map((i)=>{
                        return(<>
                            <img src={i.indexOf("http")<=0?"/img/boardimg/"+i:i} value={gnameList} style={{width:"100%", height:400, objectFit:"cover"}}/>
                            {
                                i.indexOf("http")<=0 &&
                                <button style={{marginLeft: 195}}type='button' onClick={(e)=>imgDelete(e, i)} >삭제</button>
                            }
                            
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