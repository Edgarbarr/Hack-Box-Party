import React , {useEffect} from 'react';
import Context from './context.jsx'
const MultipleChoice = ({choices, rightAnswer}) => {
    
    useEffect(()=>{
        if(document.querySelector('ul')){
            var randomizer = () => {
                var ul = document.querySelector('ul');
                for (var i = ul.children.length; i >= 0; i--) {
                    ul.appendChild(ul.children[Math.random() * i | 0]);
                }
            }
            randomizer();
        }
    })
    
    

    return ( 
        <Context.Consumer>{ context => (
            <ul className="list-group">
                {choices.map(choice => <li className="list-group-item d-flex justify-content-between align-items-center">{window.atob(choice)}</li>)}
                <li className="list-group-item d-flex justify-content-between align-items-center" onClick={context.next}>{window.atob(rightAnswer)}</li>
             </ul>
            )
        }
        </Context.Consumer>
    )
}
export default MultipleChoice;