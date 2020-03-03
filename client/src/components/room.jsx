import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar.jsx';
import Input from './input.jsx';
import Messages from './messages.jsx'
let socket;


const Room = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const endpoint = 'localhost:3187';
    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        
        socket = io(endpoint)
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room},() => {
            
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [endpoint, location.search]);
    useEffect(()=> {
        socket.on('message', (message)=> {
            setMessages([...messages, message])
        })
    }, [messages]);

    const sendMessage = (event) => {
        console.log(event.key)
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            })
        }
    }
    console.log(message, messages);

    return (
        <div>
            <div>
                <InfoBar room={room}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                <Messages messages={messages}/>
                <iframe width="0px" height="0px" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/136724831&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            </div>
        </div>
    )
}
export default Room;


{/* <input 
                    value={message} 
                    onChange={(event)=>setMessage(event.target.value)} 
                    onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null}
                /> */}