import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({name, logoutPage}) => {
    return ( <div className='topbar'>
        <p>{name}</p>
        <div>
            <Link to='/addPlayer'><button>Add Player</button></Link>
            <button onClick = {() => logoutPage() }>Logout</button>
        </div>
    </div> );
}
 
export default Topbar;