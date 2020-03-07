import React from 'react';
const Message = ({message: {user, text}, name}) => {
    let isSentByCurrentUser = false;
    if( user !== name) {
        isSentByCurrentUser = true;
    }

    return (
        !isSentByCurrentUser ? (<div className="d-inline-flex p-2 bd-highlight font-chat animated fadeIn faster"><p>You: </p><div><p className="badge badge-primary">{text}</p></div></div>) : (<div className="d-inline-flex p-2 bd-highlight font-chat animated fadeIn faster"><p>{user}: </p><div><p className="badge badge-secondary">{text}</p></div></div>)
    )
}
export default Message;