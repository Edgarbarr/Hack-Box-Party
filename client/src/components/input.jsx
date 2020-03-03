import React from 'react';

const Input = ({message, setMessage, sendMessage}) => (
    <form>
        <input className="input-group-text"
               type="text" 
               placeholder="Type a message..." 
               value={message} onChange={(event)=>setMessage(event.target.value)} 
               onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null}>
        </input>
        <button className="btn btn-primary" onClick={event => {sendMessage(event)}}>Send</button>
    </form>
)
export default Input;