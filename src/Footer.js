import React, { useEffect } from 'react'
import './Footer.css'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Grid,Slider } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { useDataLayerValue } from './DataLayer';

function Footer({spotify}) {
  const [{token,item,playing},dispatch]=useDataLayerValue();
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log("the response of current:",r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause=()=>{
    if(playing){
      spotify.pause();
      dispatch({
        type:"SET_PLAYING",
        playing:false,
      });
    }else{
      spotify.play();
      dispatch({
        type:"SET_PLAYING",
        playing:true,
      });
    }
  }

  const skipNext=()=>{
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r)=>{
      dispatch({
        type:"SET_ITEM",
        item:r.item,
      });
      dispatch({
        type:"SET_PLAYING",
        playing:true,
      });
    });
  };

  const skipPrevious=()=>{
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r)=>{
      dispatch({
        type:"SET_ITEM",
        item:r.item,
      });
      dispatch({
        type:"SET_PLAYING",
        playing:true,
      });
    })
  }

  return (
    <div className='footer'>
      <div className='footer__left'>
        <img src={item?.album.images[0].url} alt={item?.name} className='footer__albumLogo'/>
        {item?(
          <div className='footer__albumnInfo'>
          <h4>{item.name}</h4>
          <p>{item.artists.map((artist)=>artist.name).join(",")}</p>
          </div>
        ):(
          <div className='footer__albumnInfo'>
            <h4>No song is playing</h4>
            <p>...</p>
        </div>
        )}
       </div>  
      <div className='footer__center'>
        <ShuffleIcon className='footer__green'/>
        <SkipPreviousIcon onClick={skipPrevious} className='footer__icon'/>
        {playing?(
          <PauseCircleOutlineIcon onClick={handlePlayPause}
           fontSize='large' 
           className='footer__icon'/>
        ):(
          <PlayCircleOutlineIcon onClick={handlePlayPause}
          fontSize='large' 
          className='footer__icon'/>
        )}
        <SkipNextIcon onclick={skipNext} className='footer__icon'/>
        <RepeatIcon className='footer__green'/>
      </div>
      <div className='footer__right'>
      <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" sx={{color:'success.main',}} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Footer
