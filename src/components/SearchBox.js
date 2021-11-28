import React, { useState } from 'react'

import searchLogo from '../components/resources/images/search-icon.png'
import weather from '../components/resources/images/weather.png'
import Dropdown from './Dropdown'

const SearchBox = ({ countries, getWeather }) => {

  const [country, setCountry] = useState('nl');
  const [city, setCity] = useState('');

  return (
      <div className="search-container">
        <div className="logo" >
          <img src={weather} alt="logo" className="logo-img"/>
        </div>
        <Dropdown countries={countries} setCountry={setCountry}/>
        <div className="search-bar" >
          <input type="text"
          className="small-input"
          placeholder="Please enter your location..."
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyPress={(e) => e.key === 'Enter' && getWeather(`${city},${country}`)}
          />
          <button type="button" className="small-btn" onClick={() => getWeather(`${city},${country}`)}>
            <img src={searchLogo} alt="searchButton" className="img-fluid" style={city === '' ? {opacity: .5} : {}}/>
          </button>
        </div>
      </div>
  )
}

export default SearchBox
