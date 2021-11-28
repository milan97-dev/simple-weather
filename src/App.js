import React, { useCallback, useEffect, useState } from 'react';
import SearchBox from './components/SearchBox';
import Weather from './components/Weather';

const App = () => {
  
  const [weather, setWeather] = useState([]);
  const [countries, setCountries] = useState([{value: '', label: ''}]);
  const [searched, setSearched] = useState(false);
  const [gradient, setGradient] = useState({lower: '', higher: ''});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_COUNTRIES}search?query=area:0&sort=pop:-1&limit=250&client_id=${process.env.REACT_APP_ID}&client_secret=${process.env.REACT_APP_SECRET}`)
    .then(res => res.json())
    .then(data => {
      setCountries(data.response.map((country) => ({
        value: country.place.iso,
        label: country.place.iso.toUpperCase(),
      })).filter((country) => country.value !== 'cs' && country.value !== 'an'));
    });
  },[]);

  const getWeather = useCallback((query) => {
    fetch(`${process.env.REACT_APP_BASE_FORECASTS}${query}?filter=mdnt2mdnt2&limit=10&client_id=${process.env.REACT_APP_ID}&client_secret=${process.env.REACT_APP_SECRET}`)
      .then(res => res.json())
      .then(result => {
        if(result.success === true){
          setWeather(result.response[0].periods.map((day) => ({avgTemp: day.avgTempC, date: day.validTime})));
          setSearched(true);
          setNotFound(false);
        }
        else {
          setNotFound(true);
        }
      });
  },[]);

  return (
    <div className="app">
      <main style={searched ? {backgroundImage: `linear-gradient(to right bottom, ${gradient.lower}, ${gradient.higher})`, transition: '0.4s ease-out'} : {}}>
        <div className={`container ${searched ? 'top' : ''}`}>
          <SearchBox countries={countries} getWeather={getWeather}/>
          {notFound && 
          <div className="error-container">
            <span className="error-msg">We are sorry, but provided city in that country does not exist!</span>
          </div>}
          {searched && <Weather weather={weather} setGradient={setGradient}/>}
        </div>
      </main>
      
    </div>
  );
}

export default App;
