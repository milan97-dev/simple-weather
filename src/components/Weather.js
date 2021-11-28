import React, {useEffect, useMemo} from 'react'
import moment from 'moment'

const Weather = ({weather, setGradient}) => {
  const gradientColors = useMemo(() => [
    '#0F6BB4',
    '#1191DC',
    '#20A3EB',
    '#60C3FA',
    '#92D8FC',
    '#A9DDEA',
    '#D0DCAE',
    '#F7D679',
    '#FDAE6B',
  ],[]);

  const avgTemp = Math.floor(weather.reduce((acc, curr) => acc + curr.avgTemp, 0) / weather.length);
  const minTemp = weather.length !== 0 ? weather.reduce((a, b) => Math.min(a, b.avgTemp), 60) : undefined;  
  const maxTemp = weather.length !== 0 ? weather.reduce((a, b) => Math.max(a, b.avgTemp), -41) : undefined;
  const avgDate = `${moment(weather[0].date).format('MMMM DD').toUpperCase()} - ${moment(weather[6].date).format('DD YYYY')}`;
  const sevenDays = weather.slice(0, 7).map((oneDay) => ({temp: oneDay.avgTemp, dayName: moment(oneDay.date).format('dddd').toUpperCase()}));

  useEffect(() => {
    if(minTemp && maxTemp){
      let lowerGradient = 0;
      let higherGradient = 0;
      if(minTemp === 0){
        lowerGradient = gradientColors[5];
      }
      else {
        lowerGradient = gradientColors[Math.floor((minTemp / 10) + 4)];
      }

      if(maxTemp === 0){
        higherGradient = gradientColors[5];
      }
      else {
        higherGradient = gradientColors[Math.ceil((maxTemp / 10) + 4)];
      }

      setGradient({lower: lowerGradient, higher: higherGradient});
    }

  },[minTemp, maxTemp, setGradient, gradientColors]);

  return (
    <div className="weather-container">
      <div className="day-temp">
        <span className="words">{avgDate}</span>
        <div className="temp-container big">
            <span className="numbers big">{avgTemp}</span>
            <span className="temp-label big">°C</span>
        </div>
      </div>
      <div className="temp-table">
      {sevenDays && sevenDays.map((day) => 
        <div className="day-temp small" key={day.dayName}>
          <span className="words">{day.dayName}</span>
          <div className="temp-container">
            <span className="numbers">{day.temp}</span>
            <span className="temp-label">°C</span>
          </div>
        </div> )}
       </div>
    </div>
  )
}


export default Weather
