import React from "react";
import {Link} from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div className="backgroundlanding">
            <link href="//db.onlinewebfonts.com/c/831e1f4da157d96bc996f8c9f5f1e578?family=Pokemon+GB" rel="stylesheet" type="text/css"/>
            <h1>Te doy la bienvenida al fabuloso mundo de los POKéMON!</h1>
            
            <div className="botonEntrar">
            <h2>Has click para iniciar tu aventura POKéMON!</h2>
            <Link to = '/home'>
                <button>Entrar</button>
            </Link>
            </div>
        </div>
    )
} 