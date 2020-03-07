import React from 'react';

const Message = ({message: {user, text}, name}) => {
    let isSentByCurrentUser = false;
    if( user === name) {
        console.log(user, name, 'lol')
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (<div className="d-inline-flex p-2 bd-highlight"><p>{name}: </p><div><p className="badge badge-primary">{text}</p></div></div>) : (<div className="d-inline-flex p-2 bd-highlight"><p>{user}: </p><div><p className="badge badge-secondary">{text}</p></div></div>)
    )
}
export default Message;