import React, {useState, useEffect} from 'react';
const axios = require('axios');
import ScoreBoard from './scoreBoard.jsx';
import Questions from './question.jsx';


const Trivia = ({socket, room}) => {
    const [questions, setQuestions] = useState([]);
    const [playTrivia, setPlayTrivia] = useState(false);
    const [players, setPlayers] =useState([]);
    const getQuestions = ()=>{
        axios.get('https://opentdb.com/api.php?amount=10&encode=base64')
        .then((response)=>{
            var response = response.data.results;
            setQuestions(response)
            setPlayTrivia(true);
            
        })
        .catch((err)=>{console.log(err)})
        
    }
    useEffect(()=> {  
        if(questions.length !==0 && playTrivia === false) {
            var stringifyQuestions = JSON.stringify(questions);
            socket.emit('questions', stringifyQuestions,() => {
            });   
            socket.emit('totalClients')
            socket.on('returnClients', (clients)=>{
                var clientArray=[];
                for(var key in clients) {
                    clientArray.push(key)
                }
                setPlayers(clientArray)
            })
        }
    }, [questions]);

    if(socket && questions.length === 0) {
        socket.on('GameReady', (gameReady)=>{
            var parsedGameReady = JSON.parse(gameReady)
            setQuestions(parsedGameReady);
            setPlayTrivia(true);
    
        }) 
    }
    if(playTrivia === false) {
        return (
            <div className="col-3">
                <div className="card text-white bg-dark">
                  <img src="https://cdn2.vectorstock.com/i/1000x1000/89/31/trivia-night-design-vector-24218931.jpg" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Trivia | 4 Players</h5>
                    <p className="card-text">Basic knowledge Trivia.</p>
                    <a onClick={getQuestions} href="#" className="btn btn-dark">Play Trivia</a>
                  </div>
                </div>
              </div>
        )
    }
   return (
     
        
        <div className="rounded-pill">
             <div>
                <ScoreBoard socket={socket} players={players} room={room}/>
                <Questions socket={socket} questions={questions}/>
             </div>
        </div>
        

        )
}
export default Trivia;