import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { LoginInfoContext } from "../index/Index";

export default function Like(props){

    const {loginInfo} = useContext(LoginInfoContext);
    const [likeValue, setLikeValue] = useState('')
    const [likeOnOff, setLikeOnOff] = useState(false);

    useEffect(()=>{
        getLike();
        onLike();
    },[])

    const getLike = ()=>{
        axios.get("/conn/b/like/get.do", {params:{bno:props.bno}})
        .then(response=>{
            setLikeValue(response.data);
        })
        .catch(error=>{console.log(error)})
    }

    const onLike = ()=>{
        axios.get("/conn/b/like",{params:{mno:loginInfo.mno, bno:props.bno}})
        .then(response=>{
            setLikeOnOff(response.data);
        })
        .catch(error => {console.log(error)})
    }

    const onLikePost = ()=>{
        let likeData = new FormData();
        likeData.set("mno", loginInfo.mno);
        likeData.set("bno", props.bno);
        axios.post("/conn/b/like/post.do", likeData)
        .then(response =>{
            getLike();
            onLike();
        })
        .catch(error =>{console.log(error);})
    }

    const onLikeDelete = ()=>{
        axios.delete("/conn/b/like/delete.do", {params:{mno:loginInfo.mno, bno:props.bno}})
        .then(response=>{
            setLikeOnOff(false);
            getLike();
        })
        .catch(error=>{console.log(error)})
    }

    return(<>
        <li className="likeBtn">  
            {likeOnOff?<button onClick={onLikeDelete}>♥</button>:<button onClick={onLikePost}>♡</button>} 
            <span className="likeTotal">좋아요 수 {likeValue}</span>
        </li>
       
    </>)
}