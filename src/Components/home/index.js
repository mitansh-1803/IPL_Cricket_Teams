import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getTeams } from '../../APIs';
import Topbar from '../topbar';
import { Link } from 'react-router-dom';

const Home = () => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get(getTeams)
        .then(res => setTeams(res.data))
        .catch(err => console.log(err))
    }, [])

    return ( <div className='main-container'>
        <Topbar name={"IPL Cricket Teams"} />
        <div className='teams-card-container' >
            {teams?.map(item => <TeamsCard team={item} />)}
        </div>
    </div> );
}
 
export default Home;


const TeamsCard = ({team}) => {
    return ( <Link className="team-cards" to={`/detailPage/${team.team}`}>
        <img src={team.logo} alt={team.fullName} />
        <div className="team-name-container">
            <h3 className={`team-name ${team.team}`}>{team.fullName}</h3>
        </div>
    </Link> );
}