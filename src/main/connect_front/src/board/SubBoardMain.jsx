import '../css/board.css';
import axios from 'axios';
import Reply from './Reply.jsx';
import BoardList from './BoardList.jsx';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import ReplyView from "./ReplyList";
import Like from './Like.jsx';
import { LoginInfoContext } from "../index/Index";

export default function SubBaordMain(props){

    //로그인정보
    const {loginInfo} = useContext(LoginInfoContext);

    //보드정보
    const location = useLocation();
    const nav = useNavigate();
    const { myBoard } = location.state || {};

    useEffect(() => {
        // myBoard가 유효한 배열인지 확인 후 로직 수행
        if (myBoard && Array.isArray(myBoard)) {
        }
    }, [myBoard]);

    //게시글수정
    const onUpdate = (board) =>{
        nav('/board/update',{state:{board}})
    }

    //게시글삭제
    const onDelete = (bno, mnickname)=>{
        axios.delete('/conn/b/delete.do',{params:{bno:bno}})
            .then((r)=>{
                if(r.data){
                    alert('삭제완료')
                    window.location.href = '/board/sub/'+mnickname
                }else{
                    alert('삭제실패')
                }
                
            })
    }

    const r = location.state.r;

    return(<>
       {
        <section id="container">
            <div className="innerContainer">
                <div className="content mainContent">
                    <div className="topInfo topInfo4">
                        {/* <div>{location.state.r.cdate} </div> */}
                        <div className="topImg"> <img src={'/img/mimg/'+location.state.profilename} /> <p>{r.mnickname}</p></div>
                        
                        <div className='subBbtn'>
                            {                       
                                r.mnickname == loginInfo.mnickname &&
                                <button onClick={()=>onUpdate(r)}>수정</button>
                            }
                            {
                                r.mnickname == loginInfo.mnickname &&
                                <button onClick={()=>onDelete(r.bno, r.mnickname)}>삭제</button>
                            }                  
                        </div>        
                            

                    </div>
                    <ul>
                        <li data-interval="false">
                            <Carousel autoPlay={false}>
                                {
                                r.gnameList.map((img)=>{
                                    return(<>
                                        <img src={"/img/boardimg/"+img} style={{width:"100%", height:400, objectFit:"cover"}}/>
                                    </>)
                                })
                            }
                            </Carousel>
                        </li>
                    </ul>
                </div>
                <div className="btmBox">
                    <ul>
                        <li>
                            <Like bno={r.bno}/>
                        </li>
                    </ul>
                    <ul className="btmInfo">
                        <li><a href="#">{r.mnickname}</a></li>
                        <li>{r.bcontent}</li>   
                    </ul>
                </div>
                <div className="replyBox" >
                    <Reply board={r} />
                </div>
            </div>
        </section>
        }

     </>)

}