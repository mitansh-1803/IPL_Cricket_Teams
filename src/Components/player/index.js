import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPlayer } from '../../APIs';
import Footer from '../footer';

const PlayerDetail = () => {

    const [player, setPlayer] = useState({})
    const search = useParams();

    useEffect(() => {
        axios.get(getPlayer + search.id)
        .then(res => setPlayer(res.data))
        .catch(err => console.log(err))
    }, [])

    return ( <div>
        <Topbar name= {player.playerName}/>
        <div className={`player-detail-wrapper ${player.from}`}>
            <div>
                <img className="player-image" src={player.photo} alt={player.playerName} />
            </div>
            <div className="player-detail">
                <h1 className='heading player-name'>{player.playerName}</h1>
                <h2>Team: <span>{player.from}</span></h2>
                <h3>Role: <span>{player.description}</span></h3>
                <h3>Price: <span>{player.price}</span></h3>
                <h3>Status: <span>{player.isPlaying? "Playing": "On Bench"}</span></h3>
            </div>
        </div>
        <Footer />
    </div> );
}
 
export default PlayerDetail;

const Topbar = ({name}) => {
    return ( <div className='topbar'>
        <p>{name}</p>
    </div> );
}