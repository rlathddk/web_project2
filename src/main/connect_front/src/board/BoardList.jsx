import axios from "axios";
import { useEffect, useState } from "react";
import Reply from "./Reply";
import Carousel from "react-material-ui-carousel";
import Like from "./Like";
import { Link } from 'react-router-dom';

export default function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [page, setPage] = useState(1);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect( ()=>{
        axios.get(`/conn/b/get.do?page=${page}&limit=5`)
            .then((response) => {
                if (!initialLoad) { // 추가 데이터 로딩 시
                    setBoardList(prevBoardList => [...prevBoardList, ...response.data]);
                }
            })
            .catch(error => {
                console.log(error);
            });
    } , [ page ])

    useEffect(() => {
         // 초기 로딩 시에만 한 번 데이터를 가져옴
         if (initialLoad) {
            axios.get(`/conn/b/get.do?page=${page}&limit=5`)
                .then((response) => {
                    setBoardList(response.data);
                    setInitialLoad(false);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        const scrollDiv = document.getElementById('scroll');
        const handleScroll = () => {
            const scrollHeight = scrollDiv.scrollHeight;
            const scrollTop = scrollDiv.scrollTop;
            const clientHeight = scrollDiv.clientHeight;

            if ((scrollTop + clientHeight) >= (scrollHeight * 3 / 4)) {
                // 스크롤이 3/4 도달하면 새로운 데이터를 불러옴
                setPage(prevPage => prevPage + 1);
            }
        };
        scrollDiv.addEventListener('scroll', handleScroll);
        return () => {
            scrollDiv.removeEventListener('scroll', handleScroll);
        };
    }, [ initialLoad]);
     
     return(<>
     <div id='scroll'>
         {
             boardList.map((board)=>{
                 return(<>
                            <section id="container">
                                <div className="innerContainer">
                                    <div className="content mainContent">
                                        <div className="topInfo">
                                            <div className="topImg"> <img src={'/img/mimg/'+board.profilename} /> </div>
                                            <p><Link to={"/board/sub?mnickname="+board.mnickname}>{board.mnickname}</Link></p>
                                            <div>{board.cdate} </div>
                                        </div>
                                        <ul>
                                            <li>
                                                <Carousel sx={{ width: '100%', height:'370px'}} autoPlay={false}>
                                                 {
                                                    board.gnameList.map((img)=>{
                                                        return(<>
                                                            <img src={"/img/boardimg/"+img} style={{width:"100%", height:340, objectFit:"cover"}}/>
                                                        </>)
                                                    })
                                                }
                                                </Carousel>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="btmBox">
                                        <ul>
                                            <Like bno={board.bno}/>
                                        </ul>
                                        <ul className="btmInfo">
                                            <li><Link to={"/board/sub?mnickname="+board.mnickname}>{board.mnickname}</Link></li>
                                            <li>{board.bcontent}</li>
                                        </ul>
                                    </div>
                                    <div className="replyBox" >
                                        <Reply board={board}/>
                                    </div>
                                </div>
                            </section>
                        </>
                 )
             })
         }
         </div>

     </>)
}
