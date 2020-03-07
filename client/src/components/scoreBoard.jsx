import React, {useEffect, useReducer, useState} from 'react';
const axios = require('axios');

const ScoreBoard = ({players, socket, room, current, update}) => {
    const [participants, setParticipants] = useState([]);
        
//    const [participants, dispatch] = useReducer((participants, { type, value }) => {
//     switch (type) {
//       case "add":
//         return value;
//       case "update":
//         participants.forEach((playerObject) => { if(playerObject.id == value){playerObject.score++} });
//       default:
//         return participants;
//     }
//   }, []);

    useEffect(()=> {

        if(players.length > 0) {
            var allParticipants = [];
            axios.post('/room', {room: room})
            .then((results)=>{
                for(var key in results.data) {
                    console.log(results.data.key)
                    allParticipants.push(results.data[key])
                }
                setParticipants(allParticipants);
                
            })

        }
    },[players]);
    
    // function update(array){
    //     // dispatch({type: 'add', value: array})

        
    // }
   
    useEffect(()=> {
        let newParticipants = participants.slice();
        newParticipants.forEach((playerObject) => { if(playerObject.id === update.id){playerObject.score++} if(playerObject.score === 5){socket.emit('winner')}});
        setParticipants(newParticipants);
        

    }, [update])
  
    // socket.on('updateScore', (update) => {
    //     // dispatch({type: 'update', value: `${update.id}`})
    //     let newParticipants = participants.slice();
    //     newParticipants.forEach((playerObject) => { if(playerObject.id === update.id){playerObject.score++} });
    //     setParticipants(newParticipants);

    //     console.log(participants,'morexxscores')
    // })

   

    // useEffect(() => {
    //     if(participants.length > 0) {
    //         console.log('his', socket.id)
    //         dispatch({type: 'update', value: `${socket.id}`})
    //     }
        
    // }, [participants])


    if(participants.length > 0){

        return(
            <ul className="list-group list-group-horizontal-sm">
                {participants.map(player => (player.id !== socket.id) ? <li className="list-group-item d-flex justify-content-between align-items-center" id={player.id}>{player.username} <div></div><span className="badge badge-light badge-pill">{player.score}</span></li> : <li className="list-group-item d-flex justify-content-between align-items-center" id={player.id}>You<span className="badge badge-light badge-pill">{player.score}</span></li>)}
            </ul>
        )
    }
    return (
        <div>ScoreBoard</div>   
    )
}
export default ScoreBoard;