
import './App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001")

function App() {
  const [msg,setMsg]= useState("")
  const [rmsg, setRmsg]=useState("")
  const [room, setRoom]= useState("")
  const roomSelect=()=>{
    socket.emit("room",room);
  }
  const sendMsg = ()=>{
    socket.emit("send_msg", {msg,room})
    setMsg("")
    
  }
  
  useEffect(()=>{
    socket.on("receive_msg",(x)=>{
      setRmsg(x)
    })
  },[socket])
  return (
    <div className="App">
      <input placeholder='...enter room no' type="text" value={room} onChange={(e)=>setRoom(e.target.value)}/>
      <button onClick ={roomSelect}>Select the Room </button>
      <div>
      <input placeholder='...message' type="text" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
      <button onClick ={sendMsg}>Send a Msg</button>
      </div>
      
      
      <h1>{rmsg}</h1>
    </div>
  );
}

export default App;
