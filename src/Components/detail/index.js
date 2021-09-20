import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayers, getTeams } from '../../APIs';
import { Link } from 'react-router-dom';
import Footer from '../footer';

const TeamDetail = () => {
    const search = useParams();
    const [team, setTeam] = useState({});
    const [players, setPlayers] = useState([])
    const [playingPlayers, setPlayingPlayers] = useState([]);
    const [onBench, setOnBench] = useState([]);

    useEffect(() => {
        axios.get(getPlayers)
        .then(res => {
            const filterPlayers = res.data.filter(item => item.from === search.id);
            setPlayers(filterPlayers);
        })
        .catch(err => console.log(err))
        
        axios.get(getTeams)
        .then(res => {
            res.data.map(item => {
                if(item.team === search.id){
                    setTeam(item);
                }
            });
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const playing = players.filter(item => item.isPlaying === true);
        setPlayingPlayers(playing);
        const bench = players.filter(item => item.isPlaying === false);
        setOnBench(bench);
    }, [players])

    return ( <div>
        <Topbar name={team.fullName} />
        {console.log(players)}
        <div className='team'>
            <div className="team-detail">
                <div className="details">
                    <h1 className="heading">Team Name: <span>{team.fullName}</span></h1>
                    <h3>Total Players: {players.length}</h3>
                    <p>BatsMen:{players.map(item => {if(item.description === "BatsMan"){ return <span className="name">{item.playerName}</span> }})}</p>
                    <p>Bowlers:{players.map(item => {if(item.description === "Bowler"){ return <span className="name">{item.playerName}</span> }})}</p>
                    <p>All Rounders:{players.map(item => {if(item.description === "All-rounder"){ return <span className="name">{item.playerName}</span> }})}</p>
                    <p>Wicket Keepers:{players.map(item => {if(item.description === "Wicket Keeper"){ return <span className="name">{item.playerName}</span> }})}</p>
                </div>
                <div className="team-logo">
                    <img src={team.logo} alt={team.fullName}/>
                </div>
            </div>
            <div className='players-wrapper'>
                <h1 className='heading'>Playing Players</h1>
                <div className='team-players-container'>
                    {playingPlayers?.map(item => <PlayerCard player={item} id={search.id}/>)}
                </div>
                <h1  className='heading'>On Bench</h1>
                <div className='team-players-container'>
                    {onBench?.map(item => <PlayerCard player={item} id={search.id}/>)}
                </div>
            </div>          
        </div>
        <Footer />
    </div> );
}
export default TeamDetail;

const PlayerCard = ({player,id}) => {
    return ( <Link className='players-card' to={`/playerPage/${player.id}`}>
        <img src={player.photo} alt={player.playerName} />
        <div className={`player-details ${id}`}>
            <h3>{player.playerName}</h3>
            <h4>Role: <span>{player.description}</span></h4>
            <h5>Price: <span>{player.price}</span></h5>
        </div>
    </Link> );
}

const Topbar = ({name}) => {
    return ( <div className='topbar'>
        <p>{name}</p>
    </div> );
}