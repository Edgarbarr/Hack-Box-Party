import React, {useEffect, useReducer} from 'react';
const axios = require('axios');

const ScoreBoard = ({players, socket, room}) => {

   const [participants, dispatch] = useReducer((participants, { type, value }) => {
    switch (type) {
      case "add":
        return value;
      case "update":
        participants.forEach((playerObject) => { if(playerObject.id == value){playerObject.score++} });
      default:
        return participants;
    }
  }, []);

    useEffect(()=> {

        if(players.length > 0) {
            var allParticipants = [];
            axios.post('/room', {room: room})
            .then((results)=>{
                for(var key in results.data) {
                    allParticipants.push(results.data[key])
                }
                updateScore(allParticipants);
                
            })

        }
    },[players]);

    function updateScore(array){
        dispatch({type: 'add', value: array})
        
    }

    if(socket && participants.length > 0) {
        socket.on('updateScore', (update) => {
            dispatch({type: 'update', value: `${update.id}`})
            console.log(participants,'morescores')
        })
    }

    // useEffect(() => {
    //     if(participants.length > 0) {
    //         console.log('his', socket.id)
    //         dispatch({type: 'update', value: `${socket.id}`})
    //     }
        
    // }, [participants])


    if(participants.length > 0){

        return(
            <div>
                {participants.map(player => (player.id !== socket.id) ? <div id={player.id}>{player.username}<div>{player.score}</div></div> : <div id={player.id}>You<div>{player.score}</div></div>)}
            </div>
        )
    }
    return (
        <div>ScoreBoard</div>   
    )
}
export default ScoreBoard;