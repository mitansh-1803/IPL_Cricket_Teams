import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../../APIs';

const Footer = () => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get(getTeams)
        .then(res => setTeams(res.data))
        .catch(err => console.log(err))
    }, [])

    return ( <div className="footer">
        <div className="footer-items">
            <div className='app-name'>
                <p>IPL Cricket Teams</p>
            </div>
            <div className='team-links'>
                {teams?.map(item => <Link to={`/detailPage/${item.team}`}>{item.fullName}</Link>)}
            </div>
        </div>
    </div> );
}
 
export default Footer;