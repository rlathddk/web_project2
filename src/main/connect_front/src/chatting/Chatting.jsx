import { useContext, useEffect, useRef, useState } from "react"
import { LoginInfoContext } from "../index/Index";
import { useLocation} from 'react-router-dom';
import '../index.css'
import '../css/chat.css'
import SendIcon from '@mui/icons-material/Send';
export default function Chatting(props){

    let clientSocket = useRef(null);

    //받는사람정보
    const location = useLocation();
    console.log(location);

    //로그인정보가져오기
    const {loginInfo} = useContext(LoginInfoContext);
    

    if(!clientSocket.current){
        clientSocket.current = new WebSocket('ws://192.168.17.131:80/chat');
        clientSocket.current.onclose = (e) => {console.log(e);}
        clientSocket.current.onerror = (e) => {console.log(e);}
        clientSocket.current.onmessage = (e) => {
            console.log(e);
            msgList.push(JSON.parse(e.data));
            setMsgList([...msgList])
            console.log(msgList);
        }
        clientSocket.current.onopen = (e) => {console.log(e);}     

    }

    //메세지 보내기
    const onSend = (e)=>{

        let info = {
            msg : msgInput,
            forMnickname : loginInfo.mnickname,
            //toMnickname : location.state.mnickname,
            img : loginInfo.mimg
        }
        clientSocket.current.send(JSON.stringify(info));
        e.preventDefault(e);
        setMsgInput('');
    }

    //입력창
    const [msgInput, setMsgInput] = useState('');
    //보기창
    const [msgList, setMsgList] = useState([]);
    //입력창 엔터
    const activeEnter = (e)=>{
        //console.log(e);
        if(e.keyCode == 13 && e.ctrlKey){
            setMsgInput(msgInput+"\n"); return;
        }
        if(e.keyCode == 13){
            onSend(e); return
        }
    }
    
    useEffect (()=>{
        //1.
        let chatcont = document.querySelector('.chatcont');
        console.log(chatcont.scroll);
        console.log(chatcont.scrollTop);    // 현재 스크롤의 상단위치
        console.log(chatcont.scrollHeight); //스크롤 전체 높이길이 (본문이 길어졌기 때문)
        //2.
        chatcont.scrollTop = chatcont.scrollHeight;
    })
    



    return (<>
        <div className="chatbox">
            <div className="chatcont">
                {
                    msgList.map((msg)=>{
                        console.log(msg);
                        return(<>
                            {
                                loginInfo.mnickname == msg.forMnickname ?  
                                (
                                    <div className="rcont">
                                        <div  className="subcont">
                                            <div className="ccontent">
                                                {msg.msg}
                                            </div>                                    
                                        </div>
                                    </div>
                                ):
                                (
                                    
                                    <div className="lcont">
                                    <img className="pimg" src={"/img/mimg/default.png"} />
                                        <div className="tocont">
                                            <div className="name" >
                                                {msg.forMnickname}</div> 
                                                <div className="subcont">
                                                    <div className="ccontent">
                                                        {msg.msg}
                                                    </div>                                                
                                                </div>
                                                 
                                        </div>                                    
                                    </div>
                                )
                            }
                            
                        </>)
                    })
                }
            </div>
        </div>
        <div className="chatbottom">
            <textarea value={msgInput} onChange={(e)=>{setMsgInput(e.target.value)}} onKeyDown={activeEnter}></textarea>
            <button type="button" onClick={onSend}><SendIcon /></button>
        </div>        
    </>)
}