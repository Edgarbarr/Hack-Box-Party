import React from 'react';

const InfoBar = ({room}) => (
    <div className="container shadow p-3 mb-5 bg-white rounded">
    <div className="d-flex bd-highlight">
        <div className="p-2 flex-grow-1 bd-highlight">
            <h3>{room} Room</h3>
        </div>
        <div className="p-2 bd-highlight">
            <a className="leave-room btn btn-secondary"href="/">Leave Room</a>
        </div>
    </div>
    </div>
)
export default InfoBar;