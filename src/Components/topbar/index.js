import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({name}) => {
    return ( <div className='topbar'>
        <p>{name}</p>
        <Link to='/addPlayer'><button>Add Player</button></Link>
    </div> );
}
 
export default Topbar;