import './App.css';
import Login from './Login';
import React, {useEffect, useState} from 'react';
import {getResponseToken} from './spotify.js';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify=new SpotifyWebApi();

function App() {
  const [{token},dispatch]=useDataLayerValue();

  useEffect(()=>{
    const hash=getResponseToken();
    window.location.hash="";

    const _token=hash.access_token;
    if (_token){
      //to connect react and spotify 
      spotify.setAccessToken(_token);
      dispatch({
        type:'SET_TOKEN',
        token:_token,
      });

      //to get user
      spotify.getMe().then((user)=>{
        dispatch({
            type:'SET_USER',
            user:user,
        });
      });

      //to get playlists
      spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type:'SET_PLAYLISTS',
          playlists:playlists,
        });
      });

      //to get discover weekly playlist
      spotify.getPlaylist('4GpBODwgLjOwL6JcBunQcr').then((response)=>{
        dispatch({
          type:'SET_DISCOVER_WEEKLY',
          discover_weekly:response,
        });
      });

    }
  },[])
  
  return (
    <div className="app">
      {
        token? (
          <Player spotify={spotify}/>
        ):(
          <Login/>
        )
      }
    </div>
  );
}

export default App;
