import React, { useState, useEffect } from 'react';
const axios = require('axios')
import MultipleChoice from './multipleChoice.jsx';
import PackageContext from "./context.jsx";
import './style.css'
const Question = ({questions, socket, update}) => {
    let id = socket.id;
    const CorrectSound = new Audio("./correct.mp3");

    const [current, setCurrent] = useState(0);
    
    if(socket) {
        socket.on('update', (update) => {
            setCurrent(update.current)
        })
        console.log(update)
    }
    
    function nextQuestion(update){
        CorrectSound.play();
        socket.emit('nextQuestion', {current: update, id} , () => {

        })
    }
    
    return (questions.length === 0) ? (<></>) 
    :   <PackageContext.Provider value={{data: current, next: ()=> {nextQuestion(current + 1)}}}>
             <div id="game" className="container">
                {<div className="border border-light d-flex justify-content-center font-big">{window.atob(questions[current].question)}</div>}
                <MultipleChoice socket={socket} current={current} rightAnswer={questions[current].correct_answer} choices={questions[current].incorrect_answers}/>
            </div>
            <iframe width="0" height="0" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1007523130&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
        </PackageContext.Provider> 

    // if(questions.length === 0){
    //     return (<></>) 
    // }
    // return(
    //     <PackageContext.Provider value={{data: current, next: ()=> {nextQuestion(current + 1)}}}><div>
    //         {<div>{questions[current].question}</div>}
    //             <MultipleChoice current={current} nextQuestion={nextQuestion} rightAnswer={questions[current].correct_answer} choices={questions[current].incorrect_answers}/>
    //         </div>
    //     </PackageContext.Provider>)
}
export default Question;