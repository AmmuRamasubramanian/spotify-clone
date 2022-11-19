import React from 'react'
import './SongRow.css'

function SongRow({track}) {
  return (
    <div className='songRow'>
      <img src={track.album.images[0].url} alt='' className='songRow_albumImage'/>
      <div className='songRow__info'>
        <h1>{track.album.name}</h1>
      <p>{track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}</p>
      </div>
    </div>
  )
}

export default SongRow
