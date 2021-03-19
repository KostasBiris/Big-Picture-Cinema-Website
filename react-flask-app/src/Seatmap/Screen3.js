import ReactDOM from 'react-dom';
import React from 'react';
import Seatmap from './Seatmap.jsx';
import main from '../static/main.css';
import './Style/Seatmap.scss';
import logo from '../static/finlogo.png';
import headerbanner from '../static/headerbanner.png';
import follow from '../static/follow.png';
import search from '../static/search.png';
import usericon from '../static/usericon.png';


const rows = [
    [{ number: 1,}, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6},{number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [],
    [null, null, {number: '1', isVip: true}, {number: '2', isVip: true}, {number: 3, isVip: true}, {number: 4, isVip: true}, {number: 5, isVip: true}, {number: 6, isVip: true}, {number: 7, isVip: true}, {number: 8, isVip: true}, {number: 9, isVip: true}, {number: 10, isVip: true}, {number: 11, isVip: true}, {number: 12, isVip: true}, {number: 13, isVip: true}, {number: 14, isVip: true}, {number: 15, isVip: true}, {number: 16, isVip: true}, null, null],
    [],
    [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6},{number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1 }, {number: 2}, {number: 3}, {number: '4'}, {number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}],
    [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, {number: '4'}, {number: 5}, {number: 6, isReserved: true}, {number: 7}, {number: 8}, {number: 9}, {number: 10}, {number: 11}, {number: 12}, {number: 13}, {number: 14}, {number: 15}, {number: 16}, {number: 17}, {number: 18}, {number: 19}, {number: 20}]
   
];



export default function Screen3() {
    return (
      <React.Fragment>  
      <body>
      <head>
      <link rel="stylesheet" type="text/css" href={main} />
      </head>


    <img src={logo} style={{top:'1px',width:'300px',height:'190px'}}></img>
    <img src={headerbanner} style={{position:'absolute',top:'10px',left:'340px',width:'980px',height:'105px'}}></img>
    <img src={follow} style={{position: 'absolute', top: '10px', left: '1380px', width:'100px',height:'105px'}}></img>
    <div class="text">
  
        <button class="tab_background" style={{position:'absolute',top:'125px',left:'340px',width:'150px',height:'40px'}}>WHAT'S NEW </button>
        <button class="tab_background" style={{position:'absolute',top:'125px',left:'510px',width:'150px',height:'40px'}}>TICKETS</button>
        <button class="tab_background" style={{position:'absolute',top:'125px',left:'680px',width:'150px',height:'40px'}}>SCREENS</button>
        <button class="tab_background" style={{position:'absolute',top:'125px',left:'850px',width:'150px',height:'40px'}}>INFO</button>
    </div>
    <form action="{{ url_for('mainpage') }}" method="post">
     
        <input class="search_bar" name="query" id="query" type="text" placeholder="Search here.." style={{position:'absolute',top:'125px',left:'1020px'}}/>
    
        <input class="search_icon" type="image" src={search} style={{position:'absolute',top:'125px',left:'1270px',width:'50px',height:'40px'}}/>
    </form>
    <div>
        <input id="account" type="image" src={usericon} style={{position:'absolute',top:'125px',left:'1340px',width:'40px',height:'40px'}} />
        <script type="text/javascript">
        document.getElementById("account").onclick = function () {
            //location.href = "{{ url_for('account') }}"
        };
        </script>
        <button type="submit" id="login" class="text_button"
        style={{position:'absolute',top:'125px',left:'1390px',width:'60px',height:'40px'}}>LOG IN</button>
        <script type="text/javascript">
        document.getElementById("login").onclick = function () {
            //location.href = "{{ url_for('login') }}"
        };
        </script>
        <button id="register" type="submit" class="text_button"style={{position:'absolute',top:'125px',left:'1460px',width:'60px',height:'40px'}}>SIGN UP</button>
        <script type="text/javascript">
        document.getElementById("register").onclick = function () {
            //location.href = "{{ url_for('register') }}"
        };
        </script>
        <input type="image" src={usericon}
            style={{position:'absolute',top:'125px',left:'1340px',width:'40px',height:'40px'}} />
       
        <button class="text_button" style={{position:'absolute',top:'125px',left:'1390px',width:'60px',height:'40px'}}>LOG
            IN</button>
        <button class="text_button" style={{position:'absolute',top:'125px',left:'1460px',width:'60px',height:'40px'}}>SIGN
            UP</button>
            <button class="text_button" style={{position:'absolute',top:'125px',left:'1530px',width:'60px',height:'40px'}}>LOG OUT</button>
      
   
    </div> 

      <div className="Seatmap" style={{marginLeft:'400px',marginTop:'50px'}}>
      <Seatmap rows={rows} maxReservableSeats={10} alpha />   
      </div>
      <div class="header_text">
        <h1 style={{marginLeft:'700px', left:'3rem', color: '#4e5b60'}}>SCREEN</h1>
    </div>   
      </body>
    </React.Fragment>
    );
  }