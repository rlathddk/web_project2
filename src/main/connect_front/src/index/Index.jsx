import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SignUp from "../member/SignUp";
import Login from "../member/Login";
import MainBoard from "../board/MainBoard";
import SubBoard from "../board/SubBoard";
import BoardWrite from "../board/BoardWrite";
import Board from "../board/Board";
import Member from "../member/Member";
import BirthBoardWrite from "../birthBoard/BirthBoardWrite";
import Profile from "../member/Profile";
import React, { useState } from "react";
import Edit from "../member/Edit";
import Delete from "../member/Delete";
import SubBoardMain from "../board/SubBoardMain";
import BirthBoardList from "../birthBoard/BirthBoardList";
import BoardUpdate from "../board/BoardUpdate";
import Chatting from "../chatting/Chatting";

export const LoginInfoContext = React.createContext('');

export default function Index(props){
    const [loginInfo, setLoginInfo] = useState('');
    return(<>
    <LoginInfoContext.Provider value={{loginInfo, setLoginInfo}}>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/conn" element={<MainBoard/>}/>
                <Route path="/member/signup" element ={<SignUp/>}/>
                <Route path="/" element ={<Login/>}/>
                <Route path="/board/write" element={<BoardWrite/>}/>
                <Route path="/board" element={<Board/>}/>
                <Route path="/member" element={<Member/>}/>
                <Route path="/birthboard/post" element={<BirthBoardWrite/>}/>
                <Route path="/birthboard/get" element={<BirthBoardList/>} />
                <Route path="/board/sub" element={<Profile/>}/>
                <Route path="/member/edit" element={<Edit/>}/>
                <Route path="/birthboard/get" element={<BirthBoardList/>} />
                <Route path="/board/submain/:bno" element={<SubBoardMain/>}/>
                <Route path="/member/delete" element={<Delete/>}/>
                <Route path="/board/update" element={<BoardUpdate/>}/>
                <Route path="/chat" element={<Chatting/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </LoginInfoContext.Provider>

    </>)
}