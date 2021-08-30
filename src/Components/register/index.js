import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { registerAPI } from '../../APIs';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [goToHome, setGoToHome] = useState(false);

    const userRegister = () =>{
        const user = {
            username: username,
            password: password
        }
        if(!user.username.length || !user.password.length){
            alert("Please enter username and password!!")
        }
        else{
            axios.post(registerAPI, user)
            .then(res => {
                if(res.data.errors){
                    res.data.errors.map(item => alert(item.msg))
                }
                else{
                    if(res.data.isDetails){
                        setGoToHome(true);
                    }
                    alert(res.data.message)
                }
                setUsername("");
                setPassword("");
            })
            .catch(err => console.log(err))
        }
    }

    return (<> 
    {goToHome && <Redirect to='/home' />}
    <div className='registerPageContainer container'>
        <h1 id="title">IPL Cricket Teams</h1>
        <input type="text" placeholder="Enter Username...." onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="password" placeholder="Enter Password...." onChange={(e) => setPassword(e.target.value)} value={password} />
        <button id="register-btn" onClick={userRegister}>Register</button>
    </div> 
    </>);
}
 
export default Register;