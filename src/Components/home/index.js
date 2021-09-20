import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getTeams } from '../../APIs';
import Topbar from '../topbar';
import { Link , Redirect } from 'react-router-dom';
import Footer from '../footer';

const Home = () => {

    const [teams, setTeams] = useState([]);
    const [logout, setLogout] = useState(false);

    const logoutPage = () => {
        setLogout(true);
    }

    useEffect(() => {
        axios.get(getTeams)
        .then(res => setTeams(res.data))
        .catch(err => console.log(err))
    }, [])

    return (<>
        {logout && <Redirect />}
        <div className='main-container'>
            <Topbar name={"IPL Cricket Teams"} logoutPage={logoutPage} />
            <div className='teams-card-container' >
                {teams?.map(item => <TeamsCard team={item} />)}
            </div>
        </div>
        <Footer />
    </> );
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