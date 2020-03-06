import React, { createElement } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './join.jsx'
import Room from './room.jsx'

const App = () => {
    return (
        <Router>
            <Route path='/' exact component={Join}/>
            <Route path='/gameroom' exact component={Room}></Route>
        </Router>
    )
    
}

export default App;