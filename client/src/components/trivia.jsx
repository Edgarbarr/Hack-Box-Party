import React, {useState, useEffect} from 'react';
const axios = require('axios');
import ScoreBoard from './scoreBoard.jsx';
import Questions from './question.jsx';

const Trivia = ({socket, room}) => {
    const [questions, setQuestions] = useState([]);
    const [playTrivia, setPlayTrivia] = useState(false);
    const [players, setPlayers] = useState([]);
    const [update, setUpdate] = useState([]);
    const getQuestions = (event)=>{
        
        var api = event.target.getAttribute('api').toString();
        axios.get(api)
        .then((response)=>{
            var response = response.data.results;
            setQuestions(response)
            setPlayTrivia(true);
            
            // setTimeout(setColor,5000);
            
        })
        .catch((err)=>{console.log(err)})
        
    }
    function randomColor() {
        return '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6)
    }
    function setColor(){
        document.getElementById('app').style.backgroundColor = randomColor();
        // setTimeout(setColor, 100);
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
    if(socket) {
        socket.on('update', (sentUpdate) => {     
            setUpdate(sentUpdate);
        })
    }
    
    if(playTrivia === false) {
        return (
            <div className="container">
                <div className="row">
            <div className="col-3">
                <div className="card text-white bg-dark">
                  <img src="https://image.cnbcfm.com/api/v1/image/105797039-1552679350641gettyimages-1130598318.jpeg?v=1579274029&w=1400&h=950" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Basic knowledge Trivia</h5>
                    <p className="card-text">Impress friends with knowledge of useless info!</p>
                    <a api='https://opentdb.com/api.php?amount=40&encode=base64' onClick={()=>getQuestions(event)} href="#" className="btn btn-dark">Play</a>
                  </div>
                </div>
              </div>
              <div className="col-3">
              <div className="card text-white bg-dark">
                <img src="https://nwc.edu/academics/photos/program-photos/computer-science.jpg" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">C.S. Trivia</h5>
                  <p className="card-text">Don't forget to import React from 'react'.</p>
                  <a api="https://opentdb.com/api.php?amount=40&category=18&encode=base64" onClick={()=>getQuestions(event)} href="#" className="btn btn-dark">Play</a>
                </div>
              </div>
            </div>
            <div className="col-3">
                <div className="card text-white bg-dark">
                  <img src="https://www.becomingminimalist.com/wp-content/uploads/2011/11/51-Untruths-From-Television.jpg" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Television Trivia</h5>
                    <p className="card-text">Finally all that T.V. watching will come in handy!</p>
                    <a api='https://opentdb.com/api.php?amount=40&category=14&encode=base64' onClick={()=>getQuestions(event)} href="#" className="btn btn-dark">Play</a>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card text-white bg-dark">
                  <img src="https://www.cheatsheet.com/wp-content/uploads/2019/11/kanye-west-kim-kardashian-1024x704.jpg" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Celebritiy Trivia</h5>
                    <p className="card-text">I wonder what Kim Kardasian is doing?</p>
                    <a api='https://opentdb.com/api.php?amount=40&category=26&encode=base64' onClick={()=>getQuestions(event)} href="#" className="btn btn-dark">Play</a>
                  </div>
                </div>
              </div>

                </div>
            </div>
        )
    }
   return (
     
        
        <div className="rounded-pill">
             <div className="container">
                <ScoreBoard socket={socket} players={players} room={room} update={update}/>
                <Questions socket={socket} questions={questions} update={update}/>
             </div>
        </div>
        

        )
}
export default Trivia;