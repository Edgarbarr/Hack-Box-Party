import React, { useState, useEffect } from 'react';
const axios = require('axios')
import MultipleChoice from './multipleChoice.jsx';
import PackageContext from "./context.jsx";

const Question = ({questions, socket}) => {
    let id = socket.id;
    const [current, setCurrent] = useState(0);
    
    if(socket) {
        socket.on('updateQuestion', (update) => {
            console.log('hit on update',update.current)
            setCurrent(update.current)
        })
    }
    useEffect(()=>{

    },[current])
    
    function nextQuestion(update){
        socket.emit('nextQuestion', {current: update, id} , () => {

        })
    }
    return (questions.length === 0) ? (<></>) 
    :   <PackageContext.Provider value={{data: current, next: ()=> {nextQuestion(current + 1)}}}>
             <div>
                {<div>{window.atob(questions[current].question)}</div>}
                <MultipleChoice socket={socket} current={current} rightAnswer={questions[current].correct_answer} choices={questions[current].incorrect_answers}/>
            </div>
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