import React , {useState, useEffect} from 'react';
import Context from './context.jsx'
import './style.css';

const MultipleChoice = ({choices, rightAnswer}) => {

    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       play: false,
    //       pause: true,
    //     }
    //     this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    //     this.audio = new Audio(this.url);
    //   }

   
    const WrongSound = new Audio("./wrong.mp3");

    const [buttonDisabled, setButtonDisabled] = useState(false);
    useEffect(()=>{
        if(document.querySelector('ul')){
            var randomizer = () => {
                var ul = document.getElementById('questions');
                for (var i = ul.children.length; i >= 0; i--) {
                    ul.appendChild(ul.children[Math.random() * i | 0]);
                }
            }
            randomizer();
        }
    },[choices])
    
    function penalty() {
        var ul = document.getElementById('questions');
        for (var i = ul.childNodes.length - 1; i >= 0; i--) {
            console.log(ul.children[0])
            console.log(ul.childNodes[0])
            console.log(i,"i")
            // wrong.play();
            // const audio = document.getElementById('audioelement');
            WrongSound.play();
            setButtonDisabled(true)
            ul.childNodes[i].className = "list-group-item d-flex justify-content-between align-items-center wrong"
            setTimeout(reset, 2000);
        }
    }

    function reset() {
        var ul = document.getElementById('questions');
        for (var i = ul.childNodes.length - 1; i >= 0; i--) {
            setButtonDisabled(false)
            ul.children[i].className = "list-group-item d-flex justify-content-between align-items-center"
            
        }
    }
    // var wrong = new Audio('./wrong.mp3');
    return ( 
        
        <Context.Consumer>{ context => (
            
            <ul id="questions" className="list-group ">
                {choices.map(choice => <li onClick={buttonDisabled?null:penalty} className="list-group-item d-flex justify-content-between align-items-center">{window.atob(choice)}</li>)}
                <li className="list-group-item d-flex justify-content-between align-items-center" onClick={buttonDisabled?null:context.next}>{window.atob(rightAnswer)}</li>
             </ul>
             
            )
        }
        </Context.Consumer>
    )
}
export default MultipleChoice;