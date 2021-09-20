import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addPlayer, getPlayers } from '../../APIs';
import Footer from '../footer';

const AddPlayer = () => {

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [team, setTeam] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get(getPlayers)
        .then(res => setPlayers(res.data))
        .catch(err => console.log(err))
    }, [])

    const submitForm = (e) =>{
        e.preventDefault();
        const obj = {
            userData: {
                code: code
                },
            playerData: {
                id: players.length,
                playerName:name,
                from: team,
                price: price + " Cr",
                isPlaying: true,
                description: "",
                photo: url
            }
                
        }
        var status = document.getElementsByName('status');
        for(var i = 0; i < status.length; i++) {
            if(status[i].checked){
                obj.playerData.isPlaying = status[i].value;
                status[i].checked = false;
            }
        }
        var role = document.getElementsByName('role');
        for(var i = 0; i < role.length; i++) {
            if(role[i].checked){
                obj.playerData.description = role[i].value;
                role[i].checked = false;
            }
        }
        
        axios.post(addPlayer, obj)
        .then(res => {
            if(res.data.errors){
                res.data.errors.map(item => alert(item.msg))
            }
            else{
                alert(res.data.message)
            }
        })
        setCode("");
        setName('');
        setTeam('');
        setPrice('');
        setUrl('');
    }

    return ( <div>
        <Topbar name={"Add New Player"} />
        <div className='form-container'>
            <form className="form" onSubmit={(e) => submitForm(e)}>
                <label className="input-wrapper">Code:
                    <input type="text" placeholder="Enter code to add player..." onChange={(e)=> setCode(e.target.value)} value={code} />
                </label>
                <label className="input-wrapper">Player: 
                    <input type="text" placeholder="Enter name of player..." onChange={(e)=> setName(e.target.value)} value={name} />
                </label>
                <label className="input-wrapper">Team:
                    <input type="text" placeholder="Enter team of player..." onChange={(e)=> setTeam(e.target.value)} value={team} />
                </label>
                <label className="input-wrapper">Price:
                    <input type="text" placeholder="Enter price(in Cr) for player..." onChange={(e)=> setPrice(e.target.value)} value={price} />
                </label>
                <label className="input-wrapper">Image URL:
                    <input type="text" placeholder="Enter url for player image..." onChange={(e)=> setUrl(e.target.value)} value={url} />
                </label>
                <label className="input-wrapper">Status:
                    <div className="radio-wrapper">
                        <label>
                            <input type="radio" name='status' value={true} /> Playing
                        </label>
                        <label>
                            <input type="radio" name='status' value={false} /> On Bench
                        </label>
                    </div>
                </label>
                <label className="input-wrapper">Role:
                    <div className="radio-wrapper">
                        <label>
                            <input type="radio" name='role' value="BatsMan" /> BatsMan
                        </label>
                        <label>
                            <input type="radio" name='role' value='Bowler' /> Bowler
                        </label>
                        <label>
                            <input type="radio" name='role' value="All-rounder" /> All-rounder
                        </label>
                        <label>
                            <input type="radio" name='role' value="Wicket Keeper" /> Wicket Keeper
                        </label>
                    </div>
                </label>
                <div className="submit-btn-wrapper">
                    <input type='submit' value="Add Player" />
                </div>
            </form>
        </div>
        <Footer />
    </div> );
}
 
export default AddPlayer;

const Topbar = ({name}) => {
    return ( <div className='topbar'>
        <p>{name}</p>
    </div> );
}