import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div>
        <div className="container">
          <h1 className="display-1">SUPER TRIVIA GAME 9001</h1>
          <div className="row">
          <div className="col-3">
            <input placeholder="Name" className="form-control" type="text" onChange={(event) => setName(event.target.value.replace(' ', '').toLowerCase())} />
          </div>
          <div className="col-3">
            <input placeholder="Room" className="form-control" type="text" onChange={(event) => setRoom(event.target.value.replace(' ', '').toLowerCase())} />
          </div>
          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/gameroom?name=${name}&room=${room}`}>
            <button className="btn btn-primary" type="submit">Sign In</button>
          </Link>

          </div>
        </div>
      </div>
    )
}

























// class Join extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             newRoom:""
//         }
//         this.addRoom = this.addRoom.bind(this);
//         this.onChangeNewRoom = this.onChangeNewRoom.bind(this);
//     }
//     componentDidMount(){
 
//     }
//     onChangeNewRoom(e) {
//         this.setState({
//             newRoom: e.target.value
//         })
//     }
//     addRoom(e) {
//         let option = document.getElementById('Room').querySelector('[value="' + e.target.value + '"]');
//         if(option === null){
//             let newRoom = document.createElement('option');
//             newRoom.value = e.target.value;
//             newRoom.textContent =e.target.value;
//             document.getElementById('Room').appendChild(newRoom)
//         }
        
//     }
//     render() {
//         return (
//             <div>
//                 <h1>HACK BOX GAMES</h1>
//                 <section>
//                     <svg class="bi bi-person" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" d="M15 16s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002zM5.022 15h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C13.516 12.68 12.289 12 10 12c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002zM10 9a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"></path>
//                     </svg>
//                     <input type="username"></input>
//                 </section>
//                 <section>
//                     <svg class="bi bi-house-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M8.5 12.995V16.5a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5V13c0-.25-.25-.5-.5-.5H9c-.25 0-.5.25-.5.495z"></path>
//                         <path fill-rule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"></path>
//                     </svg>
//                     <select id="Room" name="Room">
//                         <option value="Lobby">Lobby</option>
//                         <option value="Edgar's Room">Edgar's Room</option>
//                     </select>
//                 </section>
//                 <section>
//                     <svg class="bi bi-house" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                         <path fill-rule="evenodd" d="M9.646 3.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4.5a.5.5 0 01-.5-.5v-4H9v4a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM4.5 9.707V16H8v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V9.707l-5.5-5.5-5.5 5.5z" clip-rule="evenodd"></path>
//                         <path fill-rule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"></path>
//                     </svg>
//                     <input type="test" id="addRoom" onChange={this.onChangeNewRoom}></input>
//                     <button onClick={this.addRoom} value={this.state.newRoom}>Add Room</button>
//                 </section>
//             </div>
//         )
//     }
// }
export default Join;