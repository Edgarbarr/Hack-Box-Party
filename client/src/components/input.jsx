import React from 'react';

const Input = ({message, setMessage, sendMessage}) => (
    <form className="d-flex p-2 bd-highlight d-flex align-items-baseline">
        <input className="input-group-text p-2 flex-grow-1 bd-highlight"
               type="text" 
               placeholder="Type a message..." 
               value={message} onChange={(event)=>setMessage(event.target.value)} 
               onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null}>
        </input>
        <button className="btn btn-primary p-2 bd-highlight" onClick={event => {sendMessage(event)}}>Send</button>
    </form>
)
export default Input;