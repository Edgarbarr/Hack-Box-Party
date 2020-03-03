import React from 'react';

const Message = ({message: {user, text}, name}) => {
    let isSentByCurrentUser = false;
    if( user === name) {
        let isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (<div className="lead"><p>{name}</p><div><p>{text}</p></div></div>) : (<div className="lead"><p>{user}</p><div><p>{text}</p></div></div>)
    )
}
export default Message;