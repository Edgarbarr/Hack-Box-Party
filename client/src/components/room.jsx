import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar.jsx';
import Input from './input.jsx';
import Messages from './messages.jsx'
import Trivia from './trivia.jsx';
import { Redirect } from 'react-router-dom';
let socket;


const Room = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [badRoom, setBadRoom] = useState(false)
    const endpoint = 'localhost:3187';
    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        
        socket = io(endpoint)
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room},(err) => {
            if(err) {
                console.log('fuck')
                // alert('Name taken for this room')
                socket.off();
                setBadRoom(true);
            }
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
    
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            })
        }
    }
    if(badRoom) {
        return (
            <div>Username taken in this Room
                <a className="leave-room"href="/">Back</a>
            </div>
        )
    } else {
        return (
            <div className="display-flex">
                <div>    
                    <InfoBar room={room}/>
                    <Trivia socket={socket} name={name} room={room}/>
                    <Messages messages={messages}/>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>
            </div>
        )
    }

}
export default Room;


{/* <input 
                    value={message} 
                    onChange={(event)=>setMessage(event.target.value)} 
                    onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null}
                /> */}