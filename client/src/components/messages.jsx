import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './message.jsx';
import './style.css'
const Messages = ({messages, name}) => (
    <ScrollToBottom className="jumbotron jumbotron-fluid d-flex align-items-stretch height-set lower-padding">
        {messages.map((message, index)=>{return <div className="d-flex justify-content-center d-flex align-items-end" key={index}>{<Message message={message} name={name}/>}</div>})}
    </ScrollToBottom>
)
export default Messages;