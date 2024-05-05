// import axios from "axios";
// import '../css/birthboard.css'
// import { useEffect, useState } from "react"
// import Carousel from "react-material-ui-carousel";

// export default function BirthBoardList(){


//     // 1. useState
//     const [birthBoardList, setBirthBoardList] = useState([]);

//     console.log(birthBoardList);

//     useEffect(()=>{
//         axios.get('/birthboard/get.do')
//         .then((r)=>{
//             console.log(r);
//             setBirthBoardList(r.data);
//         })
//         .catch(e=>{console.log(e)})
//     },[])


//     return(<>

//     {
//         birthBoardList.map((birthboard)=>{
//             return(<>
//                 <ul>
//                     <li>
//                         <div>{birthboard.bbcontent}</div>
//                         <Carousel>               
//                             {
//                             birthboard.bimglist.map((img)=>{
//                                 return(<>
//                                     <div>123123</div>
//                                     <img src={"/img/birthboardimg/"+img} style={{width:"100%", height:400, objectFit:"cover"}}/>                              
//                                 </>)
//                             })
//                         }
//                         </Carousel>
//                     </li>
//                 </ul>
//             </>)  // return 2
//         })
//     }
//     </>) // return 1
// }