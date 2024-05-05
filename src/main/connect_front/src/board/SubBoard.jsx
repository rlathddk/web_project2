import '../css/board.css';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate , useParams  } from "react-router-dom";

export default function SubBoard(props) {

    const [myBoard, setMyBoard] = useState([]);
    const {mnickname} = useParams();
    const [ nBno, setNBno] = useState(0);

    const navigate = useNavigate();

    useEffect(()=>{

        axios.get('/conn/b/myboard/get.do', {params:{mnickname : mnickname}})
            .then((r)=>{
                setMyBoard(r.data);
            })
    },[])

    
    const onClickImg = (myBoard,r) =>{        
        navigate('/baord/submain',{state:{myBoard:myBoard, r:r}})
    }

    return(<>
        <section id="container">
            <div >
                <div className="myInfo">
                    <div className='imgBox'><img src="" alt="" /></div>
                    <ul>
                        <li>정보</li>
                    </ul>
                    <span>팔로우</span>
                    <span>팔로워</span>
                </div>
                <div className="content subContent">
                <ul className='potoList' >
                    {myBoard.map((r)=>{
                        return(<>                           
                                <li><img src={"/img/boardimg/" +r.gnameList[0]} className='gnameList' onClick={()=>onClickImg({myBoard,r})}></img></li>                  
                            
                        </>)
                    })}
                </ul>
                </div>
            </div>
        </section>
    </>)
}