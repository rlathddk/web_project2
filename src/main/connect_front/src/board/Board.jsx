import axios from 'axios';
import '../css/board.css';
import Reply from './Reply.jsx';
export default function Board(props){

    // const [boardInfo, setBoardInfo] = useState('');

    axios.get("/conn/b/get.do")
    .then(response=>{
        // setBoardInfo(response.data)
    })
    .catch(error=>{console.log(error)})

    return(<>
        <section id="container">
            <div className="innerContainer">
                <div className="header">
                    HEADER
                </div>
                <div className="content mainContent">
                    <ul>
                        <li>이미지 미리보기</li>
                    </ul>
                </div>
                <div className="btmInfo">
                </div>
                <div className="replyBox">
                    <Reply />
                </div>
                <div className="footer">
                    FOOTER
                </div>
            </div>
        </section>
    </>)
}