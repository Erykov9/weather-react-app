import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox'

const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);


  const handleCityChange = useCallback((cityName) => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=aab718497f94b477dbc6a88f9cba8a1d
&units=metric`)
   .then(res => {
      if(res.status === 200) {
        
        return res.json()
          .then(data => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
              setPending(false);
              setWeather(weatherData);
          });
        } else {
          setError(true)
        }
  });
  }, []);
    

  return (
    <section>
      <PickCity func={handleCityChange}/>
      { ( weather && !pending && !error ) && <WeatherSummary {...weather}/> }
      { (pending && !error ) && <Loader />}
      { error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;