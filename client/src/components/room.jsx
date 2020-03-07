import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar.jsx';
import Input from './input.jsx';
import Messages from './messages.jsx'
import Trivia from './trivia.jsx';
import { Redirect } from 'react-router-dom';
let socket;
// let xx;


// let winner = winner || false;
const Room = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [badRoom, setBadRoom] = useState(false);
    const[gameOver, setGameOver] = useState(false);
    const endpoint = 'localhost:3187';
    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        
        socket = io(endpoint)
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room},(err) => {
            if(err) {
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

    if(socket) {
        socket.on('gameover', (winner)=> {
            console.log(winner, 'gameover listening in room')
            setGameOver(winner);
        })

    }


    const sendMessage = (event) => {
    
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            })
        }
    } 
    if(gameOver !== false) {
        return (
            <div>
                <div>Winner: {gameOver.username}</div>
                <a className="leave-room"href="/">Main Menu</a>
            </div>
        )
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
                    <div className="container">
                    <Messages messages={messages}/>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>

                    </div>
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