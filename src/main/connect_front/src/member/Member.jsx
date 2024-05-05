import axios from "axios"
import { useEffect, useState } from "react"
import { Link , resolvePath, useLocation  } from 'react-router-dom';

export default function Member(){

    const [member, setMember] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');

    useEffect(()=>{
        axios.get("/conn/m/list/get.do", {params: {search: searchValue}})
        .then(response=>{
            setMember(response.data);
        })
        .catch(error=>{console.log(error)})
    },[searchValue])    

    return(<>
        <div id="container searchM">
            {member.map((data)=>{
                return (<div key={data.mno}>
                    <div className="topInfo3">
                    <div className="topImg"><img src={'/img/mimg/'+data.mimg} /></div>
                    <Link to={"/board/sub?mnickname="+data.mnickname}><div key={data.mno}>{data.mnickname}</div></Link>
                    </div>
                </div>)
            })}
        </div>
    </>)
}