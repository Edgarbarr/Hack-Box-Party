import React from 'react';

const InfoBar = ({room}) => (
    <div>
        <div>
            <h3>{room}</h3>
        </div>
        <div>
            <a href="/">Leave Room</a>
        </div>
    </div>
)
export default InfoBar;