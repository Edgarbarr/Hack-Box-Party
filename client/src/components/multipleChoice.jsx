import React from 'react';
import Context from './context.jsx'
const MultipleChoice = ({choices, rightAnswer, socket}) => {

    return ( 
        <Context.Consumer>{ context => (
            <ul>
                {choices.map(choice => <li>{window.atob(choice)}</li>)}
                <li onClick={context.next}>{window.atob(rightAnswer)}</li>
             </ul>
            )
        }
        </Context.Consumer>
    )
   
}
export default MultipleChoice;