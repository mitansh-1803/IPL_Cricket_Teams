import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { loginAPI } from '../../APIs';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [goToHome, setGoToHome] = useState(false);

    const userLogin = () =>{
        const user = {
            username: username,
            password: password
        }
        if(!user.username.length || !user.password.length){
            alert("Please enter username and password!!")
        }
        else{
            axios.post(loginAPI, user)
            .then(res => {
                if(res.data.isDetails){
                    setGoToHome(true);
                }
                alert(res.data.message)
                setUsername("");
                setPassword("");
            })
            .catch(err => console.log(err))
        }
    }

    return (<> 
    {goToHome && <Redirect to='/home' />}
    <div className='container'>
        <h1 id="title">IPL Cricket Teams</h1>
        <input type="text" placeholder="Enter Username...." onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="password" placeholder="Enter Password...." onChange={(e) => setPassword(e.target.value)} value={password} />
        <button id="login-btn" onClick={userLogin}>Login</button>
        <Link to="/register"><button id="register-btn">Register</button></Link>
    </div> 
    </>);
}
 
export default Login;