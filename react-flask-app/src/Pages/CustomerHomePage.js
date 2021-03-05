import React from 'react';
import search from '../static/search.png'
import logo from '../static/finlogo.png'
import headerbanner from '../static/headerbanner.png'
import follow from '../static/follow.png'
import usericon from '../static/usericon.png'
import poster1 from '../static/poster1.jpg'
import poster2 from '../static/poster2.jpg'
import poster3 from '../static/poster3.jpg'
import poster4 from '../static/poster4.jpg'
import poster5 from '../static/poster5.jpg'
import poster6 from '../static/poster6.jpg'
import poster7 from '../static/poster7.jpg'
import left from '../static/left.png'
import right from '../static/right.png'
import main from '../static/main.css';
import { shiftLeft, shiftRight } from './scripts/scripts'
function searchMovie () {
    //Juan, implement search code here.
    return 0;
}

function login() {
    return 0;
}

function register() {
    return 0;
}

function account() {
    return 0;
}

class CustomerHomePage extends React.Component{
    render() {
        return (
        <body>
<head>
    <link rel="stylesheet" type="text/css" href={main}/>
    <link rel="icon" href="data:;base64,iVBORw0KGgo"/>
</head>
<body style={{backgroundColor: 'rgb(255,255,255)'}}/>
<img src={logo} style={{top:'1px',width:'300px',height:'190px'}} />
<img src={headerbanner} style={{position:'absolute',top:'10px',left:'340px',width:'980px',height:'105px'}}/>
<img src={follow} style={{position: 'absolute', top: '10px' ,left: '1380px',width:'100px',height:'105px'}}/>
<div class="text">
    <button className="tab_background" style={{position:'absolute', top:'125px', left: '340px', width:'150px', height:'40px'}}>WHAT'S NEW </button>
    <button className="tab_background" style={{position:'absolute', top:'125px', left: '510px', width:'150px', height:'40px'}}>TICKETS</button>
    <button className="tab_background" style={{position:'absolute', top:'125px', left: '680px', width:'150px', height:'40px'}}>SCREENS</button>
    <button className="tab_background" style={{position:'absolute', top:'125px', left: '850px', width:'150px', height:'40px'}}>INFO</button>
</div>
    <form>
        <input className="search_bar" name = "query" id="query" type="text" placeholder="Search here.." style={{position:'absolute',top:'125px',left:'1020px'}}/>
        <input onClick={search} className="search_icon" type="image" src={search} style={{position:'absolute',top:'125px',left:'1270px',width:'50px',height:'40px'}}/>
    </form>
<div>
    <button onClick = {login} type = "submit" id = "login" class="text_button"style={{position:'absolute',top:'125px',left:'1390px',width:'60px',height:'40px'}}>LOG IN</button>
    <button onClick = {register} id = "register" type ="submit" class="text_button"  style={{position:'absolute',top:'125px',left:'1460px',width:'60px',height:'40px'}}>SIGN UP</button>
    <button className="text_button"style={{position:'absolute',top:'125px',left:'1390px',width:'60px',height:'40px'}}>LOG IN</button>
    <button className="text_button"style={{position:'absolute',top:'125px',left:'1460px',width:'60px',height:'40px'}}>SIGN UP</button>
    <input onClick = {account} id="account" type="image" src={usericon} style={{position:'absolute',top:'125px',left:'1340px',width:'40px',height:'40px'}} />
</div>
</body>

        );
    }
};

export default CustomerHomePage;

