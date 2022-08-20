
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './component/TopButtons';
import Inputs from './component/Inputs';
import TimeAndLocation from './component/TimeAndLocation';
import TempatureAndDetails from './component/TempatureAndDetails';
import Forecast from './component/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const[query , setQuery] = useState({q:'berlin'})
    const[units , setUnits] = useState('metric')
    const[weather , setWeather] = useState(null)

    
    useEffect(() => {
        const fetchWeather = async () => {

           const message = query.q ? query.q : "current location.";

           toast.info("Fetaching weather for " + message);

            await getFormattedWeatherData("weather" , {...query , units}).then(
              (data) => {

                toast.success(
                  `Successfully fetched weather for 
                  ${data.name} , ${data.country}.`
                )
                setWeather(data);
              });
        };

        fetchWeather()
    },[query , units]);
    
    const formatBackground = () => {
      if(!weather) return 'from-cyan-700 to-blue-700'
      const threshold = units === 'metric' ? 35 : 60;
      if(weather.temp <= threshold){
         return 'from-cyan-700 to-blue-700'
      }
      else{
        return 'from-yellow-700 to-orange-700'
      }
    }

  return (
    
    <div className={`mx-auto max-w-screen-md mt4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}></TopButtons>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}></Inputs>
      
      {weather && (
      <div>
          <TimeAndLocation weather={weather}></TimeAndLocation>
          <TempatureAndDetails weather={weather}>
          </TempatureAndDetails>

          <Forecast title="hourly forecast" items={weather.hourly}>
          </Forecast>
          <Forecast title="Daily forecast" items={weather.daily}>
          </Forecast>
      </div>
      )}

      <ToastContainer
      position="top-right"
      autoClose={5000}
      theme="colored"
      newestOnTop={true}
      >

      </ToastContainer>






    </div>
  );
}

export default App;
